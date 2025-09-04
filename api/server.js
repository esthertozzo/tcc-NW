const express = require('express');
const app = express();
const path = require('path')
const port = 3000;
const { MongoClient, ObjectId } = require('mongodb');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const faceapi = require('face-api.js');// importa a biblioteca para reconhecimento facial
const canvas = require('canvas'); // permite processamento de imagens de imagens no Node.js
const axios = require('axios'); //permite a requisições HTTP de APIs externas
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} = require('@google/generative-ai');

const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = ''

const GENERATION_CONFIG = {
  temperature: 0.1,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};


const SAFETY_SETTINGS = [{
  category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
},
{
  category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
},
{
  category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
},
{
  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
},
];

// Middleware para ler JSON e multipart/form-data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Upload de fotos usando multer (armazenamento local simples)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'senha-secreta',
    resave: false,
    saveUninitialized: true,
}))


const url = 'mongodb://localhost:27017';
const dbName = 'BeautyScan';
const colecaoUsuarios = 'usuarios';
const colecaoPost = 'post';
const colecaoAnaliseFacial = "analiseFacial"
app.listen(port, async () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });


//Função "protegerRota"-> você não pode acessar as rotas do app sem estar cadastrado

function protegerRota(req, res, proximo){
    if(req.session.usuario){
        proximo();
    }else{
        res.redirect('/tela-cadastro');
    }
}

//Modelos de Reconhecimento Facial
async function loadFaceModels(){
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    //modelo de detecção de rostos em imagens

    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
    //modelo para identificar 68 pontos faciais

    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
    //modelo para pegar características únicas de cada rosto

    console.log('Modelos carregados')
}

//funções para reconhecimento do formato do rosto, analisar os olhos, a boca, sombrancelhas,

app.get('/', async(req,res)=>{
    res.sendFile(path.join(__dirname + '/../src/app/onboarding/onboarding.page.html'))
})







app.get('/tela-cadastro',async (req,res) => {
    res.sendFile(path.join(__dirname + '/../src/app/tela-cadastro/tela-cadastro.page.html'));
})
/*
    Os "/../" indica que está saindo da pasta "api-login".
*/


app.post('/tela-cadastro', async (req, res) => {
    const {nome, email, senha} = req.body;

    const client = new MongoClient(url,{
        useUnifiedTopology: true
    });

    try{
        await client.connect();
        const banco = client.db(dbName);
        const usuarios =  banco.collection(colecaoUsuarios)
        const emailExistente = await usuarios.findOne({
            email: req.body.email
        });

        if(emailExistente){
            res.status(400).json({ success: false, message: 'Usuário já existente!' });
            console.log('Usuário existente!')
        } else {
            const senhaCriptografada = await bcrypt.hash(req.body.senha,10);
            const result = await usuarios.insertOne({
                nome: req.body.nome,
                email: req.body.email,
                senha: senhaCriptografada,
            });
            res.status(201).json({
                success: true,
                message: 'Usuário cadastrado com sucesso!',
                id: result.insertedId
            });
            console.log('Usuário cadastrado!')
        }


    }catch (erro){
        res.send('Erro ao registrar o usuário');
        console.log(erro);

    }finally{
        client.close()
    }
        /*const result = await usuarios.insertOne(novoUsuario);
        console.log(`Usuário cadastrado com sucesso! ID: ${result.insertedId}`);

        } catch(err){
            console.error('Erro ao cadastrar usuário.', err)
        } finally {
            client.close();
        }*/
});

app.get('/tela-login', async(req,res)=>{
    res.sendFile(path.join(__dirname + '/../src/app/tela-login/tela-login.page.html'));
})

app.post('/tela-login', async (req,res) => {
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });

    try{


        await client.connect();
        const banco = client.db(dbName);
        const usuarios = banco.collection(colecaoUsuarios);
        const usuario = await usuarios.findOne({
            email: req.body.email
        });

        const emailAdm = "startupfiap2025@gmail.com";
        const senhaAdm = "cediyy232425"

        if((usuario && req.body.email == emailAdm && await bcrypt.compare(req.body.senha, usuario.senha))){
            req.session.usuario = {
                id: usuario._id.toString(),
                nome: usuario.nome,
                email: usuario.email
            };
            res.status(200).json({
                id: usuario._id.toString(),
                nome: usuario.nome,
                email: usuario.email
            });
            console.log('Bem-vindo ADM');
        }
        else if(usuario && await bcrypt.compare(req.body.senha, usuario.senha)){
            req.session.usuario = {
                id: usuario._id.toString(),
                nome: usuario.nome,
                email: usuario.email
            };
            res.status(200).json({
                id: usuario._id.toString(),
                nome: usuario.nome,
                email: usuario.email
            });
            console.log('Bem-vindo ao app da BeautyScan!');
        }else{
            res.status(401).json({ message: 'A senha ou o email estão incorretos. Tente novamente.' });
        }

    }catch(erro){
        console.error('Erro ao realizar o login:', erro);
        res
            .status(500)
            .send('Erro encontrado. Tente novamente.');

    }finally{
        client.close();
    }
});






app.get('/home-page', protegerRota, (req,res)=>{
  res.sendFile(__dirname + "/../src/app/home-page/home-page.page.html")
})


app.get('/tela-planos', protegerRota, (req,res)=>{
  res.sendFile(path.join(__dirname + '/../src/app/tela-planos/tela-planos.page.html'))
})

app.post('/tela-planos', protegerRota, async (req,res) => {
   const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    try{
       await client.connect();
        const banco = client.db(dbName);
        const usuarios = banco.collection(colecaoUsuarios);

        const plano = usuarios.findOne({
          plano: req.body.plano
        });

        if(plano = null){
          const planoEscolhido = usuarios.insertOne(plano)
        }


    }catch{

    }finally{

    }
})

app.get('/tela-perfil',protegerRota, (req,res)=>{
  res.sendFile(__dirname + '/../src/app/tela-perfil/tela-perfil.page.html')
})

app.get('/editar-perfil',protegerRota, (req,res)=>{
  res.sendFile(__dirname + '/../src/app/editar-perfil/editar-perfil.page.html')
})

app.post('/editar-perfil', protegerRota, async (req, res) => {

    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    const {id, nome, email, senha, data, preferencias, plano} = req.body
    console.log(nome);
    try{
      await client.connect();
        const banco = client.db(dbName);
        const usuarios = banco.collection(colecaoUsuarios);

        // Preparar objeto de atualização
        const updateData = {};
        if (nome) updateData.nome = nome;
        if (email) updateData.email = email;
        if (data) updateData.data = data;
        if (preferencias) updateData.preferencias = preferencias;
        if (plano) updateData.plano = plano;

        // Só atualiza a senha se foi fornecida
        if (senha && senha.trim() !== '') {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            updateData.senha = senhaCriptografada;
        }

        const perfilEditado = await usuarios.updateOne(
          {_id: new ObjectId(id)},
          { $set: updateData }
        );

      if(perfilEditado.modifiedCount > 0){
        console.log(`Usuário com ID: ${id} atualizado com sucesso!`)
        res.status(200).json({
          success: true,
          message: 'Perfil atualizado com sucesso'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

    } catch (erro){
      console.error('Erro ao atualizar o usuario:', erro);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar o usuário. Tente novamente mais tarde'
      });
    } finally {
      client.close();
    }

});

// Rota para verificar se a sessão ainda é válida
app.get('/verificar-sessao', (req, res) => {
    if (req.session.usuario) {
        res.status(200).json({
            success: true,
            usuario: req.session.usuario
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Sessão não válida'
        });
    }
});

//Rota para o reconhecimento facial do usuário

app.get('/camera', protegerRota,async(req,res)=>{
    res.sendFile(path.join(__dirname + '/../src/app/camera/camera.page.html '))
})



app.post('/camera', protegerRota, async(req,res)=>{
    /*
    se o usuário estiver optando pelo plano gratuito:
        -> vai usar a analise facial com limite de recomendações de maquiagem
    se o usuario estiver optando pelo plano pago:
        -> vai usar a analise facial, recomendação de maquiagem, "salvar looks" e a bea (chat bot)
    */

    const {id, img} = req.body;
    const deteccoes =  await faceapi.detectAllFaces(img)
                            .withFaceLandmarks()
                            .withFaceExpressions()
                            .withAgeAndGender();

    const deteccao = deteccoes[0]
    console.log("Gênero:", deteccao.gender)


})


app.get('/tela-post', async (req, res) =>{
    res.sendFile(path.join(__dirname + '/../src/app/tela-post/tela-post.page.html'))
})
app.post('/tela-post', upload.array('fotos', 10), async (req, res) => {
      const client = new MongoClient(url, {
        useUnifiedTopology: true
    });

    try{
        await client.connect();
        const db = client.db(dbName);
        const usuarios = db.collection(colecaoUsuarios);
        const posts = db.collection(colecaoPost)

        const {nome, descricao} = req.body
        const usuarioEncontrado = await usuarios.findOne({ nome })

        if(!usuarioEncontrado){
            return res.status(404).json({erro: 'Usuário não encontrado'});
        };

        const novoPost = {
            usuarioId: usuarioEncontrado._id,
            descricao,
            fotos: req.files.map(file => file.path),
            criandoEm: new Date()
        };

        await posts.insertOne(novoPost);

        res.status(201).json({mensagem: 'Post criando com sucesso!'})
    }
    catch(err){
        console.error('Erro ao salvar post:', err);
        res.status(500).json({err: 'Erro no servidor'});
    }finally{
        await client.close();
    }
});
//app.post('/reconhecimento-facial', async(req,res))



