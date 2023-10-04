let th;
let hh;

function resp(item, th) {
  const response = fetch("http://15.228.159.221:3000/" + item)
    .then((responseData) => {
      return responseData.json();
    })
    .then((jsonData) => {
      if (item != "hist") {
        console.log(jsonData);
        document.getElementById(item).innerHTML = jsonData;
      } else {
        th = jsonData.temperatureHist;
        hh = jsonData.humidityHist;
        console.log(hh);
        const ctx = document.getElementById("myChart");

        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
              {
                label: "Temperatura",
                data: th,
                borderWidth: 1,
              },
              {
                label: "Umidade",
                data: hh,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
resp("temperature");
resp("humidity");
resp("hist");
//http://15.228.159.221:3000/
//    <meta http-equiv="refresh" content="2; index.html">
