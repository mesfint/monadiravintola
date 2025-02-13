import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { BookingModalProps } from '../types/booking';

const TEST_CONFIG = {
  WHATSAPP_NUMBERS: {
    RESTAURANT: '+358440646044', // Current number
    TEST_1: '+1234567890',       // Test number 1
    TEST_2: '+0987654321',       // Test number 2
  },
  ACTIVE_NUMBER: '+358468946609' // Change this to test different numbers-eyuel
};



interface FormData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: Dayjs | null;
  time: Dayjs | null;
  contactMethod: 'whatsapp' | 'email' | 'sms';
  message: string;
  specialRequests: string;
}


const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    guests: '',
    date:  null,
    time:  null,
    contactMethod: 'whatsapp',
    message: '',
    specialRequests: ''
  });

  // Generate a unique booking reference
  const generateReference = () => {
    const date = new Date() ;
    return `BK${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reference = generateReference();
    setBookingReference(reference);
    
    // Format the message for WhatsApp
    const message = encodeURIComponent(`
🍽️ *New Table Booking Request*
---------------------------
📋 Reference: ${reference}
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
👥 Guests: ${formData.guests}
📅 Date: ${dayjs(formData.date).format('DD/MM/YYYY')}
⏰ Time: ${dayjs(formData.time).format('HH:mm')}
📝 Special Requests: ${formData.specialRequests}
---------------------------
Please reply to confirm this booking.
    `);

    // Replace with restaurant's actual WhatsApp number
    const whatsappUrl = `https://wa.me/${TEST_CONFIG.ACTIVE_NUMBER}?text=${message}`;
    

    // Log the test information
    console.log('Sending booking to:', TEST_CONFIG.ACTIVE_NUMBER);
    console.log('Message:', decodeURIComponent(message));

    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation step
    setActiveStep(1);
    setConfirmationSent(true);
  };

  const isDevelopment = process.env.NODE_ENV === 'development';

  const steps = ['Booking Details', 'Confirmation'];

  const renderConfirmation = () => (
    <Stack spacing={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" color="primary">
        Booking Request Sent!
      </Typography>
      
      <Typography>
        Your booking reference: <strong>{bookingReference}</strong>
      </Typography>
      
      <Typography>
        We will confirm your booking via WhatsApp shortly.
        Please save your booking reference.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        If you don't receive a confirmation within 30 minutes,
        please call us at <strong>+123 456 7890</strong>
      </Typography>

      <Button 
        variant="contained" 
        onClick={onClose}
        sx={{ mt: 2 }}
      >
        Close
      </Button>
    </Stack>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'palette.primary.main', 
        color: 'white',
        textAlign: 'center' 
      }}>
        Book a Table
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mt: 2, mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              
              <TextField
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              
              <TextField
                label="Phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <FormControl>
                <InputLabel>Number of Guests</InputLabel>
                <Select
                  value={formData.guests}
                  label="Number of Guests"
                  required
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <MenuItem key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                  minDate={dayjs().add(1, 'hour')}
                  disablePast
                />
                
                <TimePicker
                  label="Time"
                  value={formData.time}
                  onChange={(newValue) => setFormData({ ...formData, time: newValue })}
                  minTime={dayjs().set('hour', 11)}
                  maxTime={dayjs().set('hour', 22)}
                />
              </LocalizationProvider>

              <TextField
                label="Special Requests"
                multiline
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  mt: 2,
                  bgcolor: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  }
                }}
              >
                Send Booking Request
              </Button>
            </Stack>
          </form>
        ) : (
          renderConfirmation()
        )}
      </DialogContent>

      <Snackbar
        open={confirmationSent}
        autoHideDuration={6000}
        onClose={() => setConfirmationSent(false)}
      >
        <Alert severity="success">
          Booking request sent successfully!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default BookingModal;