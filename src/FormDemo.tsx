import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React from "react";
import { array, boolean, mixed, number, object, string } from "yup";
import { InvestmentDetails } from "./InvestmentDetails";

const initialValues: InvestmentDetails = {
  acccountType: [],
  fullName: "",
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: "",
  dependents: -1,
  acceptedTermsAndConditions: false,
};

export function FormDemo() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Criar Nova Conta</Typography>

        <Formik
          //Validação
          validationSchema={object({
            fullName: string()
              .required("Essa resposta é obrigatória!")
              .min(2)
              .max(100),
            accountType: array(string().oneOf(["Personal", "Business"]))
              .min(1)
              .max(1),
            initialInvestment: number().required().min(100),
            dependents: number().required().min(0).max(5),
            acceptedTermsAndConditions: boolean().oneOf([true]),
            investmentRisk: array(
              string().oneOf(["High", "Medium", "Low"])
            ).min(1),
            commentAboutInvestmentRisk: mixed().when("investmentRisk", {
              is: (investmentRisk: string[]) =>
                investmentRisk.find((ir) => ir === "High"),
              then: string().required().min(20).max(100),
              otherwise: string().min(20).max(100),
            }),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            return new Promise<void>((res) => {
              setTimeout(() => {
                console.log(values);
                console.log(formikHelpers);
                console.log("---------");
                res();
              }, 5000);
            });
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
              <Box marginBottom={2}>
                <label>Selecione o tipo de conta:</label>
                <FormGroup>
                  <MyCheckbox
                    name="accountType"
                    value="Personal"
                    label="Pessoal"
                  />
                  <MyCheckbox
                    name="accountType"
                    value="Business"
                    label="Empresa"
                  />
                </FormGroup>
                <ErrorMessage name="accountType" />
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="fullName" as={TextField} label="Nome completo" />
                  <ErrorMessage name="fullName" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="initialInvestment"
                    type="number"
                    as={TextField}
                    label="Initial Investment"
                  />
                  <ErrorMessage name="initialInvestment" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <label>Risco de investimento:</label>
                <FormGroup>
                  <MyCheckbox name="investmentRisk" value="High" label="Alto" />
                  <MyCheckbox
                    name="investmentRisk"
                    value="Medium"
                    label="Médio"
                  />
                  <MyCheckbox name="investmentRisk" value="Low" label="Baixo" />
                </FormGroup>
                <ErrorMessage name="investmentRisk" />
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="commentAboutInvestmentRisk"
                    as={TextField}
                    multiline
                    rows={3}
                    rowsMax={10}
                    label="Comente sobre o investimento (opcional)"
                  />
                  <ErrorMessage name="commentAboutInvestmentRisk" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="dependents"
                    label="Dependentes"
                    as={TextField}
                    select
                  >
                    <MenuItem value={-1}>Select ...</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                  <ErrorMessage name="dependents" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox
                    name="acceptedTermsAndConditions"
                    label="Aceitar termos e condições"
                  />
                  <ErrorMessage name="acceptedTermsAndConditions" />
                </FormGroup>
              </Box>

              <Button type="submit" disabled={isSubmitting || isValidating}>
                Enviar
              </Button>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value,
  });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
