import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Form, FormInput, FormGroup } from "shards-react";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function InputForm({ updateData }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    updateData(data);
  };

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label>Остаточная активность БуХЭ, %</label>
        <input
          label="Остаточная активность БуХЭ, %"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          type="number"
          step="0.001"
          name="Остаточная активность БуХЭ, %"
          onChange={handleSubmit}
          value={register.password}
          ref={register({ required: true })}
        />
      </FormGroup>
      <FormGroup>
        <label>Остаточное свечение Т, % для Р+Л</label>
        <input
          type="number"
          step="0.01"
          variant="outlined"
          label="Остаточное свечение Т, % для Р+Л"
          name="Остаточное свечение Т, % для Р+Л"
          ref={register({ required: true })}
        />
      </FormGroup>
      <FormGroup>
        <label>Остаточное свечение Т, % для Р+Л+Д</label>
        <input
          type="number"
          step="0.01"
          variant="outlined"
          label="Остаточное свечение Т, % для Р+Л+ДГ"
          name="Остаточное свечение Т, % для Р+Л+ДГ"
          ref={register}
        />
      </FormGroup>
      <FormGroup>
        <label>Значение абсорбции</label>
        <input
          type="number"
          step="0.01"
          variant="outlined"
          label="Значение абсорбции"
          name="Значение абсорбции"
          ref={register}
        />
      </FormGroup>
      <FormGroup>
        <label>Содержание гумуса, %</label>
        <input
          type="number"
          step="0.01"
          variant="outlined"
          label="Содержание гумуса, %"
          name="Содержание гумуса, %"
          ref={register}
        />
      </FormGroup>

      <FormGroup>
        <label>pH</label>
        <input
          type="number"
          step="0.01"
          variant="outlined"
          label="pH"
          name="pH"
          ref={register}
        />
      </FormGroup>

      <FormGroup>
        <label>Процент физической глины</label>
        <input
          type="number"
          step="0.01"
          variant="outlined"
          label="Процент физической глины"
          name="Процент физической глины"
          ref={register}
        />
      </FormGroup>

      <Button type="submit" variant="outlined" />
    </Form>
  );
}
//"Значение абсорбции"
//"Содержание гумуса, %"
//"pH"
//"Процент физической глины"
