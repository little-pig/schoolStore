/**
 * Created by lenovo on 2015/4/4.
 */
//发布商品
function getOrder(){
    var personName = document.getElementById('personName').innerHTML;
    window.location = '/order' + personName;
}
//分类查询
function book_search(x){
    window.location = '/book_search' + x;
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