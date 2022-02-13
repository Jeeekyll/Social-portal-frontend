import { UpdateUserDto } from '@/store/types/user.type';
import { Control } from 'react-hook-form';

export interface ProfileFieldProps {
  control: Control<UpdateUserDto, any>;
  error: boolean;
  name: any;
  placeholder: string;
  getFieldValue: (name: string) => string;
  isReset: boolean;
}
