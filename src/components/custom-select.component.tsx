import React, { useCallback, useMemo, useState } from 'react';
import { Autocomplete, IconButton, TextField, TextFieldProps } from '@mui/material';
import { Add } from '@mui/icons-material';

interface ICustomSelectOption {
  id: number;
  label: string;
}

type CustomSelectProps = TextFieldProps & {
  initialOptions: Array<ICustomSelectOption>;
  multiple?: boolean;
  value: ICustomSelectOption | ICustomSelectOption[] | null;
  onChange: (value: ICustomSelectOption | ICustomSelectOption[] | null) => unknown;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  multiple = false,
  initialOptions,
  value,
  onChange,
  ...textFieldProps
}) => {
  const [ options, setOptions ] = useState<ICustomSelectOption[]>(initialOptions);
  const [ open, setOpen ] = useState<boolean>(false);
  const [ text, setText ] = useState<string>('');

  const addVisible = useMemo(() => {
    if (text === '') return false;

    return options.map(option => option.label).includes(text) === false;
  }, [options, text]);

  const onAddOption = useCallback(() => {
    const newValue = { id: (options.pop()?.id ?? 0) + 1, label: text };
    
    setOptions(prev => [ ...prev, newValue ]);
    setOpen(false);

    onChange(multiple ? [ ...value as ICustomSelectOption[], newValue ] : newValue);
  }, [text, options]);
  
  return (
    <Autocomplete
      multiple={multiple}
      open={open}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      value={value}
      onChange={(_, value) => onChange(value)}
      inputValue={text}
      onInputChange={(_, value) => setText(value)}
      renderInput={params => (
        <TextField
          {...textFieldProps}
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {addVisible && (
                  <IconButton onClick={onAddOption}>
                    <Add />
                  </IconButton>
                )}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};
