/**
 * Created by lenovo on 2015/4/4.
 */
window.onload = function(){
  var cList = document.getElementById('nav-inner-ul').getElementsByTagName('li');
    for(var i= 1;i<cList.length;i++){
        cList[i].onclick = function(){
            var x = this.innerHTML;
            window.location = '/book_search' + x;
        }
    }
};
//发布商品
function getOrder(){
    var personName = document.getElementById('personName').innerHTML;
    window.location = '/order' + personName;
}
//order_show()
function order_show(id){
    window.location = '/show' + id;
}

/*show  */
//返回首页
function rt_index(){
    var personName = document.getElementById('personName').innerText;
    window.location = "/rt_index" + personName;
}