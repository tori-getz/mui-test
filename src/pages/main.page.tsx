import React, { useMemo, useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { CustomSelect } from "~/components";
import { useGetPositionsQuery, useGetRelationsQuery } from "~/gql/graphql";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValidationSchema } from "~/validation";
import { z } from "zod";

type FormSchema = z.infer<typeof FormValidationSchema>;

export const MainPage: React.FC = () => {
  const { loading: relationsLoading, data: relations } = useGetRelationsQuery();
  const { loading: positionsLoading, data: positions } = useGetPositionsQuery();

  const relationsOptions = useMemo(() => {
    return (
      relations?.applicantIndividualCompanyRelations?.data.map(
        ({ id, name }) => ({
          id: parseInt(id),
          label: name,
        })
      ) ?? []
    );
  }, [relations]);

  const positionsOptions = useMemo(() => {
    return (
      positions?.applicantIndividualCompanyPositions?.data.map(
        ({ id, name }) => ({
          id: parseInt(id),
          label: name,
        })
      ) ?? []
    );
  }, [positions]);

  const { handleSubmit, control, watch } = useForm<FormSchema>({
    resolver: zodResolver(FormValidationSchema),
  });

  const onSubmit = (formData: FormSchema) => {
    console.log(formData);
  }

  if (relationsLoading || positionsLoading) return <CircularProgress />;

  return (
    <Grid container gap={2} flexDirection="column">
      <Controller
        control={control}
        defaultValue={null!}
        name='relations'
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomSelect
            label={error?.message ?? 'Relations'}
            error={error !== undefined}
            initialOptions={relationsOptions}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='positions'
        defaultValue={[]}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomSelect
            label={error?.message ?? 'Positions'}
            multiple
            error={error !== undefined}
            initialOptions={positionsOptions}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label={error?.message ?? 'Name'}
            value={value}
            onChange={onChange}
            error={error !== undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label={error?.message ?? 'Description'}
            value={value}
            multiline
            onChange={onChange}
            error={error !== undefined}
          />
        )}
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit form</Button>
    </Grid>
  );
};
