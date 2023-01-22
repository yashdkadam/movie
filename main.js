if (localStorage.getItem("time") === null) {
  localStorage.setItem("time", "day");
}
function appendHtml(data, time) {
  var body = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i]["magnet"] != undefined) {
      body += `<a href='/player' onclick='setLocal("${data[i]["magnet"]}")'>
          <div class="card" style="width: 18rem;">
            <img src="/static/placeholder.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text">${data[i].name}</p>
            <p class="card-text">Seeders : ${data[i].seeder}</p>
            <p class="card-text">Lechers : ${data[i].leecher}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
            </a>`;
    }
  }
  var html = `<div class="contain">`;
  html += body + `</div>`;
  // localStorage.setItem("html", html);
  $(document).ready(function () {
    // var html = localStorage.getItem("html");
    $("body").append(html);
    // $(".day").slick({
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    // });
  });
}
async function get() {
  var time = localStorage.getItem("time");
  var url =
    "https://corsproxy.io/?https://curious-parka-yak.cyclic.app/api/torrents/" +
    time;
  const response = await fetch(url).then((d) => d.json());
  console.log(response);
  appendHtml(response, time);
}
get();

function setLocal(magnet) {
  console.log(magnet);
  localStorage.setItem("magnet", magnet);
}
