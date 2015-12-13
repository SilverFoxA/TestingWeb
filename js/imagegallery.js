showImages(0);
pagination();
prePageNum = 0;

function showImages(pageNum) {
    // operations of creating the layout
    var path = './img/slider/';
    var imgs = '';
    var imgs1= '';
    var start = pageNum * 8 + 0;
    var num = (pageNum * 8) + 8;
    for (var i = start; i < num; i++) {
        if(i<((num+start)/2)){
        var img = '<td><a href=\"' + path + i.toString() + '.png\"><img id="' + i.toString() + '"src=\"' + path + i.toString() + '.png\" ></img></a></td>';
        imgs += img;
        } else{
         var img1 = '<td><a href=\"' + path + i.toString() + '.png\"><img id="' + i.toString() + '"src=\"' + path + i.toString() + '.png\" ></img></a></td>';
        imgs1 += img1;
        }
    };
    document.getElementById('images-ul').innerHTML = '<tr>'+imgs+'</tr>'+'<tr>'+imgs1+'</tr>';
}

function pagination() {
    // page numbers
    var html = '<a id="prePage" onclick="goPrePage()"><li>&lt;</li></a>';
    html += '<a id="page0" onclick="goPage(0)" class="selected"><li>1</li></a>';
    for (var i = 1; i < 2; i++) {
        var li = '<a id="page' + i.toString() + '\" onclick="goPage(' + i.toString() + ')"><li>' + (i + 1).toString() + '</li></a>';
        html += li;
    };
    html += '<a id="nextPage" onclick="goNextPage()"><li>&gt;</li></a>';
    document.getElementById('pagination-ul').innerHTML = html;
}

function goPage(pageNum) {
    // go to page funtions
    var page = document.getElementById('page' + pageNum.toString());
    page.className = "selected";
    showImages(pageNum);
    hideSwitcher(pageNum);
    if (prePageNum != pageNum) {
        var prePage = document.getElementById('page' + prePageNum.toString());
        prePage.className = '';
    }
    prePageNum = pageNum;
}

function goPrePage() {
    // go to previous page
    if (prePageNum > 0)
        var pageNum = prePageNum - 1;
    goPage(pageNum);
}

function goNextPage() {
    // go to next page
    if (prePageNum < 19)
        var pageNum = prePageNum + 1;
    goPage(pageNum);
}

function hideSwitcher(pageNum) {
    pageNum == 0 ? document.getElementById('pre').style.display = 'none' : document.getElementById('pre').style.display = 'block';
    pageNum == 19 ? document.getElementById('next').style.display = 'none' : document.getElementById('next').style.display = 'block';

}

//function imgInfoHover(id) {
//    imgInfo = document.getElementById(id).parentNode.lastChild;
//    imgInfo.className = 'imginfo-hover';
//}
//
//function imgInfoMouseOut(id) {
//    imgInfo = document.getElementById(id).parentNode.lastChild;
//    imgInfo.className = 'imginfo';
//}