window.onload = function(){

    //Ajax事件
    var xhr;
    var zUl = document.getElementById('c-part2-new-ul');
    if (window.XMLHttpRequest)
    {//  IE7+, Firefox, Chrome, Opera, Safari
        xhr=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('get', '/idx_ajx', true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 &&  xhr.status == 200){
            var str="";
            var resJson = xhr.responseText;
            var res = eval("("+resJson+")");
            for(var i=0;i<res.length;i++){
                str =str+ "<li class='order_show'><p class='hide_id hidden'>"+res[i]._id+"</p>"
                    +"<img src='/avatar/"+res[i].imagePath+"' class='c-part2-new-ul-img'>"
                    +"<div class='c-part2-new-ul-img-price fr'>￥"+res[i].price
                    +"</div><div class='c-part2-detail'><p class='c-part2-detail-goodsName'>"
                    +res[i].goodsName+"</p><p class='c-part2-detail-describe'>"+res[i].describe
                    +"<p class='c-part2-detail-more'><span>"+res[i].goodsCode
                    +"</span></p></p></div></li>"
            }
            document.getElementById('c-part2-new-ul').innerHTML = str;
        }
    };


    //事件委托
    zUl.onclick = function(ev){
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "img"){
            var id = target.parentNode.childNodes[0].innerHTML;
            target.onclick = order_show(id);
        }
    };

    //slider事件
    var slider = document.getElementById('slider');
    var sliderLi = slider.getElementsByTagName('li');
    var timer = pl= null;
    var index = 1;
    function autoPlay(){
        pl= setInterval(function(){
            index >= sliderLi.length && (index = 0);
            show(index);
            index++;
        },4000);
    }
    autoPlay();

    function show(index){
        var alpha = 0;
        for(var i=0;i<sliderLi.length;i++){
            sliderLi[i].style.opacity = 0;
            sliderLi[i].filter ="alpha(opacity=0)";
        }

        timer = setInterval(function(){
            alpha += 2;
            alpha > 100 && (alpha = 0);
            sliderLi[index].style.opacity = alpha/100;
            sliderLi[index].style.filter = "alpha(opacity="+ alpha+")";
            alpha == 100 && (clearInterval(timer));
        },20);
    }
};