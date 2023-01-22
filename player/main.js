var base;
var token = "";
var key = "spos";
var html;
async function temp2() {
  let url = "https://corsproxy.io/?https://snowfl.com/";
  $.get(url, function (data, textStatus, jqXHR) {
    var el = document.createElement("html");
    el.innerHTML = data;
    console.log(el);
    base = el.getElementsByTagName("script")[2].src;
    let pattern = /v=[ A-Za-z]*/;
    base = base.match(pattern)[0];
    console.log(base);
    base = base.slice(2, base.length);
    return base;
  });
}
temp2();
async function temp() {
  let base = await temp2();
  let url = "https://corsproxy.io/?https://snowfl.com/b.min.js?v=" + base;
  console.log(url);
  $.get(url, function (data, textStatus, jqXHR) {
    let pattern = /=\"[ A-Za-z]*\";\$\(\(function/;
    let pattern1 = /\"[ A-Za-z]*\"/;
    let text = data;
    text = text.match(pattern)[0];
    let text1 = text.match(pattern1)[0];
    text1 = text1.slice(1, text1.length - 1);
    token += text1;
    temp1();
  });
}
temp();

var data1;
// https://snowfl.com/fanAtGeaLTtxFRLeYIxbQaSAGpMClogkgSrj/Q/a2n2PJJd/0/NONE/24/1?_=1672574618613
//https://snowfl.com/joENprgGGGgbDEOVBIZhmJTzXHqOFuyvl/spos/6w1cm7jO/0/NONE/NONE/1?_=1672556162514
async function temp1() {
  let time = localStorage.getItem("time");
  $.get(
    "https://corsproxy.io/?https://snowfl.com/" +
      token +
      "/Q/a2n2PJJd/0/NONE/" +
      time +
      "/1?_=1672574618613", // url
    function (data, textStatus, jqXHR) {
      // success callback
      data1 = JSON.parse(data);
      console.log(data1);
      console.log(typeof data1);
      html = "";
      //   $(document).ready(function (data1) {

      for (let i = 0; i < data1.length; i++) {
        // localStorage.clear();
        if (data1[i]["magnet"] != undefined) {
          localStorage.setItem(i, data1[i]["magnet"]);
          html += `<a href='/' onclick='setLocal("${i}")'>
          <div class="card" style="width: 18rem;">
            <img src="/static/placeholder.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data1[i].name}</h5>
            <p class="card-text">${data1[i].name}</p>
            <p class="card-text">Seeders : ${data1[i].seeder}</p>
            <p class="card-text">Lechers : ${data1[i].leecher}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
            </a>`;
        }
      }
      localStorage.setItem("html", html);
      console.log(html);

      //   });
    }
  );
  console.log("token", token);
}

function setLocal(magnet) {
  console.log(magnet);
  localStorage.setItem("magnet", magnet);
  window.location.reload();
}

$(document).ready(function () {
  $("body").append(localStorage.getItem("html"));
});
