export interface ThaanaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export interface ThaanaFormWrapperProps {
  children: React.ReactNode;
  onChange?: (formData: Record<string, string>) => void;
}
