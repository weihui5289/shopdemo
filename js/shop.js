/*
* @Author: anchen
* @Date:   2017-05-31 21:22:09
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-04 21:54:15
*/
    //函数
    function changeState(arr1,arr2){
        var state=true;
        for(var n=0;n<arr1.length;n++){
            if(arr1[n].checked==false){
                state=false;
                break;
            }
        }
        if(state==true){
            for(var m=0;m<arr2.length;m++){
                arr2[m].checked=true;
            }
        }else{
             for(var m=0;m<arr2.length;m++){
                arr2[m].checked=false;
        }

    }

}


    //判断商品是否选中计算本店总价的价格


    function shopTotal(goods){

        var radioAll=goods.querySelectorAll(".radio")
        // console.log(radioAll)
        var shopPrice=0;
        for(var i=0;i<radioAll.length;i++){
            if(radioAll[i].checked==true){
                var radioPrice=radioAll[i].parentNode.querySelector(".subTotal").innerText
                shopPrice=shopPrice+parseInt(radioPrice)
            }
        }

        goods.querySelector(".top>span i").innerText=shopPrice
    }

    //计算宝贝总价

    function baobei(){
        var shopArr=document.querySelectorAll(".goods .top>span i")
        var total=0
        for(var j=0;j<shopArr.length;j++){

             total=total+parseInt(shopArr[j].innerText)
    }

        // document.querySelectorAll(".cars .down>span i").innerText=total
        var downArr=document.querySelectorAll(".cars .down>span i")

        for(var m in downArr){
            downArr[m].innerText=total;
        }
    }


    window.onload=function(){

    var allArr=document.querySelectorAll(".all")
    // console.log(allArr)      两个全选按钮
    var inputArr=document.querySelectorAll(".cars input")
    //所有的input
    var shopArr=document.querySelectorAll(".cars .top .shop")

    var radioArr=document.querySelectorAll(".cars .goods .radio")

    var countArr=document.querySelectorAll(".cars .price .count")


    console.log(countArr)

    //刷新页面所有按钮被选中
    for(var i in inputArr){
        if(inputArr[i].type=="checkbox"){
        inputArr[i].checked=true;
        }
    }



    for(var j in allArr){
        //点击全选按钮
        allArr[j].onchange=function(){
               var state=this.checked
                  for(var i in inputArr){
                    if(inputArr[i].type=="checkbox"){
                        inputArr[i].checked=state
            }
        }

        //计算本店总价
        var shopArr1 = document.querySelectorAll(".cars .goods");
                for(var i = 0;i<shopArr1.length;i++){
                    shopTotal(shopArr1[i])
                }

        baobei();
    }
}


    //点击店铺按钮
    for(var i in shopArr){

        //点击店铺按钮控制他对应的商品
        shopArr[i].onchange=function(){
            var state=this.checked
            var shopRadio=this.parentNode.parentNode.querySelectorAll(".goods .price .radio")
            // console.log(shopRadio)
            //输出两个radio,下面输出一个
            for(var j in shopRadio){
                shopRadio[j].checked=state;
            }

            // var state1=true;
            // for(var m in shopArr){
            //     if(shopArr[m].checked==false){
            //         state1=false;
            //     }
            // }
            // if(state1==true){
            //         for(var n in allArr){
            //             allArr[n].checked=true;
            //     }
            // }else{
            //     for(var n in allArr){
            //             allArr[n].checked=false;
            //     }

            // }
            //函数 点击店铺控制全选按钮
            changeState(shopArr,allArr)
            shopTotal(this.parentNode.parentNode)
            baobei();
        }
    }



//点击商品按钮控制全选
    for(var i in radioArr){
        radioArr[i].onchange=function(){

            changeState(radioArr,allArr)
      //控制当前的店铺按钮，不能用函数，函数全为控制

    var dqian=this.parentNode.parentNode.querySelectorAll(".goods .radio")

    var state1=true;
        for(var j=0;j<dqian.length;j++){
            if(dqian[j].checked==false){
                state1=false;

                  break;

            }
        }




        if(state1==true){
            this.parentNode.parentNode.querySelector(".shop").checked=true;
            console.log(this.parentNode.parentNode.querySelectorAll(".shop"))

        }else{
            this.parentNode.parentNode.querySelector(".shop").checked=false;
            }

            shopTotal(this.parentNode.parentNode)
            baobei();

    }
 }


    //点击加号
    for(var i in countArr){
        countArr[i].onclick=function(event){
            //事件委托
            var ele=event.target
            // console.log(ele) //输出加法减法

            var num=parseFloat(ele.parentNode.parentNode.querySelector("input").value)

            var xiaoji=parseFloat(ele.parentNode.parentNode.parentNode.querySelector(".price .price1").innerText)
            // console.log(xiaoji)
          //判断加减
          switch(ele.className){
            case "add":num++;
            ele.parentNode.parentNode.querySelector("input").value=num

            var subTotal=num*xiaoji
            ele.parentNode.parentNode.parentNode.querySelector(".price .subTotal").innerText=subTotal

            shopTotal(ele.parentNode.parentNode.parentNode.parentNode)

             baobei();
            break;
            //减法
            case "sub":if(num>1){
                num--;
            }
              ele.parentNode.parentNode.querySelector("input").value=num

            var subTotal=num*xiaoji
            ele.parentNode.parentNode.parentNode.querySelector(".price .subTotal").innerText=subTotal
            //计算本店总价
            shopTotal(ele.parentNode.parentNode.parentNode.parentNode);
            //计算宝贝总价
              baobei();

            break;
          }

        }
    }



    //点击删除按钮

    var delArr=document.querySelectorAll(".goods .price .del")
    // console.log(delArr)

    for(var m in delArr){
        delArr[m].onclick=function(event){
            event.preventDefault()
            var goods = this.parentNode.parentNode.parentNode;

          if(this.parentNode.parentNode.parentNode.querySelectorAll(".price").length==1){
                this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode)
          }else{
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
      }
    shopTotal(goods);

    baobei();



             //获取商品个数

            var goodNum=parseInt(document.querySelector(".gouwuche>b i").innerText)
            // console.log(goodNum)

            var radioArr1=document.querySelectorAll(".cars .goods .radio")

             goodNum1=radioArr1.length

            document.querySelector(".gouwuche>b i").innerText= goodNum1




            }
        }


}






