declare module 'FeedbackHost/ReviewCarousel' {
  const ReviewCarousel: React.ComponentType;
  export default ReviewCarousel;
}

declare module 'MenuHost/Hero' {
  const Hero: React.ComponentType;
  export default Hero;
}

declare module 'MenuHost/Menu' {
  const Menu: React.ComponentType;
  export default Menu;
}

declare module 'BookingHost/BookingModal' {
  export interface BookingModalProps {
    open: boolean;
    onClose: () => void;
  }
  
  const BookingModal: React.ComponentType<BookingModalProps>;
  export default BookingModal;
}