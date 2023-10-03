function resp(item) {
  const response = fetch("http://15.228.159.221:3000/" + item)
    .then((responseData) => {
      return responseData.json();
    })
    .then((jsonData) => {
      document.getElementById(item).innerHTML = jsonData;
    })
    .catch((e) => {
      console.log(e);
    });
}
resp("temperature");
resp("humidity");
