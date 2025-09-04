import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Slide {
  title: string;
  description: string;
  image: string; // caminho da imagem / ícone
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false,
})
export class OnboardingPage implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLElement>;

  slides: Slide[] = [
    {
      title: 'Mapeie sua beleza',
      description: 'Use nossa tecnologia de mapeamento facial com IA para entender seus traços.',
      image: '/assets/icon/electronic-id.png', // substitui por ícone real
    },
    {
      title: 'Recomendações personalizadas',
      description: 'Receba dicas de maquiagem que respeitam seu tom, tipo e formato de rosto.',
      image: '/assets/icon/lipstick.png',
    },
    {
      title: 'Conecte-se com a comunidade',
      description: 'Compartilhe seu progresso, veja inspirações e troque experiências.',
      image: '/assets/icon/users.png',
    },
  ];

  currentIndex = 0;

  constructor(private navCtrl: NavController) {}

  ngAfterViewInit() {
    // opcional: observar resize para ajustar
  }

  onScroll() {
    const el = this.carousel.nativeElement;
    const slideWidth = el.offsetWidth;
    const scrollPos = el.scrollLeft;
    // arredonda pro índice mais próximo
    const index = Math.round(scrollPos / slideWidth);
    this.currentIndex = index;
  }

  isLast() {
    return this.currentIndex === this.slides.length - 1;
  }

  proximo() {
    const el = this.carousel.nativeElement;
    const slideWidth = el.offsetWidth;
    const target = Math.min((this.currentIndex + 1) * slideWidth, el.scrollWidth);
    el.scrollTo({ left: target, behavior: 'smooth' });
  }

  voltar() {
    const el = this.carousel.nativeElement;
    const slideWidth = el.offsetWidth;
    const target = Math.max((this.currentIndex - 1) * slideWidth, 0);
    el.scrollTo({ left: target, behavior: 'smooth' });
  }

  comecar() {
    this.navCtrl.navigateRoot('/tela-cadastro');
  }

  pular() {
    this.navCtrl.navigateRoot('/tela-login');
  }
}
