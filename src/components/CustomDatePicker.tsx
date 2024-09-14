import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker = ({date, setDate}: any) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date}
        
        onChange={(newValue: any) => setDate(newValue)}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;