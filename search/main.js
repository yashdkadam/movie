if (localStorage.getItem("time") === null) {
  localStorage.setItem("time", "day");
}
function appendHtml(data) {
  var body = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i]["magnet"] != undefined) {
      body += `<a href='../player' onclick='setLocal("${data[i]["magnet"]}")' style="text-decoration: none;">
          <div class="card m-3" style="width: 18rem;">
            <img src="https://i.im.ge/2023/01/22/sRNDMY.placeholder.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text">${data[i].name}</p>
            <p class="card-text">Seeders : ${data[i].seeder}</p>
            <p class="card-text">Lechers : ${data[i].leecher}</p>
            <a href="../player" class="btn btn-primary">Stream Now</a>
            </div>
            </div>
            </a>`;
    }
  }
  var html = `<div class="contain">`;
  html += body + `</div>`;
  $(document).ready(function () {
    $("body").append(html);
  });
}
async function get() {
  var search = localStorage.getItem("search");
  var url =
    "https://corsproxy.io/?https://curious-parka-yak.cyclic.app/api/torrents/search/" +
    search;
  const response = await fetch(url).then((d) => d.json());
  console.log(response);
  appendHtml(response);
}
get();

function setLocal(magnet) {
  console.log(magnet);
  localStorage.setItem("magnet", magnet);
}
