import React, { useState} from "react";
import "./App.css";
import { Bar } from "react-chartjs-2";
import { reference } from "./reference";
import Grid from "@material-ui/core/Grid";
import { Form, FormGroup } from "shards-react";
import { useForm } from "react-hook-form";
const ra = 160; 
const t2 = 110; 
const t3 = 100; 
const d250 = 2; 
const humus = 10; 
const ph = 14; 
const clay = 100; 
const sand = 100; 
let data = {
  labels: [
    "RА, %",
    "T2, %",
    "T3, %",
    "D250",
    "Humus, %",
    "pH",
    "Clay content",
    "Sand content",
  ],
  datasets: [
    {
      label: "Reference",
      backgroundColor: "rgba(233,137,126, 0.5)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(233,137,126,0.7)",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      barPercentage: 1.0,
      categoryPercentage: 0.9,
    },
    {
      label: "Sample",
      borderWidth: 1,
      backgroundColor: "rgba(60,121,171, 0.8)",
      hoverBackgroundColor: "rgba(48,99,142,0.9)",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      barPercentage: 1.0,
      categoryPercentage: 0.9,
    },
  ],
};
function App() {
  const { register, handleSubmit } = useForm();
  const [soilType, setSoilType] = useState("");

  const onSubmit = (value) => {
    data.datasets[1].data[0] = (
      (parseFloat(value["RА, %"]) / ra) *
      100
    ).toFixed(3);
    data.datasets[1].data[1] = (
      (parseFloat(value["Т2, %"]) / t2) *
      100
    ).toFixed(3);
    data.datasets[1].data[2] = (
      (parseFloat(value["Т3, %"]) / t3) *
      100
    ).toFixed(3);
    data.datasets[1].data[3] = (
      (parseFloat(value["D250"]) / d250) *
      100
    ).toFixed(3);
    data.datasets[1].data[4] = (
      (parseFloat(value["Humus, %"]) / humus) *
      100
    ).toFixed(3);
    data.datasets[1].data[5] = ((parseFloat(value["pH"]) / ph) * 100).toFixed(
      3
    );
    data.datasets[1].data[6] = (
      (parseFloat(value["Clay content"]) / clay) *
      100
    ).toFixed(3);
    data.datasets[1].data[7] = (
      (parseFloat(value["Sand content"]) / sand) *
      100
    ).toFixed(3);

    let diff1 = (Number.parseFloat(data.datasets[1].data[6]) * clay) / 100;
    let diff2 = (Number.parseFloat(data.datasets[1].data[4]) * humus) / 100;
    let diff3 = (Number.parseFloat(data.datasets[1].data[7]) * sand) / 100;
    let idx = 0;
    let min_diff = Math.sqrt(
      Math.pow(
        Math.abs(Number.parseFloat(reference[0]["Clay content"]) - diff1),
        2
      ) +
        Math.pow(
          Math.abs(Number.parseFloat(reference[0]["Humus, %"]) - diff2),
          2
        ) +
        Math.pow(
          Math.abs(Number.parseFloat(reference[0]["Sand content"]) - diff3),
          2
        )
    );
    reference.forEach((elem, index) => {
      let clayTemp = Number.parseFloat(Number.parseFloat(elem["Clay content"]));
      let humusTemp = Number.parseFloat(Number.parseFloat(elem["Humus, %"]));
      let sandTemp = Number.parseFloat(Number.parseFloat(elem["Sand content"]));
      if (
        min_diff >
        Math.sqrt(
          Math.pow(Math.abs(clayTemp - diff1), 2) +
            Math.pow(Math.abs(humusTemp - diff2), 2) +
            Math.pow(Math.abs(sandTemp - diff3), 2)
        )
      ) {
        min_diff = Math.sqrt(
          Math.pow(Math.abs(clayTemp - diff1), 2) +
            Math.pow(Math.abs(humusTemp - diff2), 2) +
            Math.pow(Math.abs(sandTemp - diff3), 2)
        );
        idx = index;
      }
    });
    setData(idx);
  };
  
  const setData = (idx) => {
    data.datasets[0].data[0] = (
      (parseFloat(reference[idx]["RА, %"]) / ra) *
      100
    ).toFixed(3);
    console.log(data.datasets[0].data[0]);
    data.datasets[0].data[1] = (
      (parseFloat(reference[idx]["Т2, %"]) / t2) *
      100
    ).toFixed(3);
    data.datasets[0].data[2] = (
      (parseFloat(reference[idx]["Т3, %"]) / t3) *
      100
    ).toFixed(3);
    data.datasets[0].data[3] = (
      (parseFloat(reference[idx]["D250"]) / d250) *
      100
    ).toFixed(3);
    data.datasets[0].data[4] = (
      (parseFloat(reference[idx]["Humus, %"]) / humus) *
      100
    ).toFixed(3);
    data.datasets[0].data[5] = (
      (parseFloat(reference[idx]["pH"]) / ph) *
      100
    ).toFixed(3);
    data.datasets[0].data[6] = (
      (parseFloat(reference[idx]["Clay content"]) / clay) *
      100
    ).toFixed(3);
    data.datasets[0].data[7] = (
      (parseFloat(reference[idx]["Sand content"]) / sand) *
      100
    ).toFixed(3);
    setSoilType(reference[idx]["Soil type"]);
}

  return (
    <div className="App">
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={4}>
          <Form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="gridFormView"
          >
            <FormGroup>
              <label>RА, %</label>
              <input
                label="RА, %"
                type="number"
                step="0.1"
                name="RА, %"
                onChange={handleSubmit}
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Т2, %</label>
              <input
                size="lg"
                type="number"
                step="0.1"
                variant="outlined"
                label="Т2, %"
                name="Т2, %"
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Т3, %</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Т3, %"
                name="Т3, %"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <label>D250</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="D250"
                name="D250"
                max="2"
                ref={register({ required: true })}
              />
            </FormGroup>
            <FormGroup>
              <label>Humus, %</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Humus, %"
                name="Humus, %"
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
              <label>Clay content</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Clay content"
                name="Clay content"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <label>Sand content</label>
              <input
                type="number"
                step="0.01"
                variant="outlined"
                label="Sand content"
                name="Sand content"
                ref={register}
              />
            </FormGroup>
            <button type="submit" variant="outlined">
              Find
            </button>
          </Form>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Bar
            redraw
            data={data}
            options={{
              legend: {
                labels: {
                  fontSize: 24,
                }
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      color: "rgba(171,171,171,1)",
                      lineWidth: 0.5,
                    },
                    stacked: true,
                    ticks: {
                      fontSize: 20,
                    }
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: "rgba(171,171,171,1)",
                      lineWidth: 0.5,
                    },
                    stacked: false,
                    ticks: {
                      beginAtZero: true,
                      suggestedMin: 0,
                      suggestedMax: 100,
                      fontSize:24,
                    },
                  },
                ],
              },
              
            }}
          ></Bar>
          <div>
            <h1>{soilType}</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  );

  
}

export default App;
