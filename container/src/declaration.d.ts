declare module 'FeedbackHost/ReviewCarousel' {
  const ReviewCarousel: React.ComponentType;
  export default ReviewCarousel;
}

declare module 'menu/Hero' {
  const Hero: React.ComponentType;
  export default Hero;
}

declare module 'menu/Menu' {
  const Menu: React.ComponentType;
  export default Menu;
}

declare module 'booking/BookingModal' {
  export interface BookingModalProps {
    open: boolean;
    onClose: () => void;
  }
  
  const BookingModal: React.ComponentType<BookingModalProps>;
  export default BookingModal;
}

declare module "feedback/ReviewCarousel" {
  const ReviewCarousel: React.ComponentType;
  export default ReviewCarousel;
}