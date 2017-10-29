var MySwiper = {
    myswipers: [],
    init: function() {
        MySwiper.myswipers = [];
        if(typeof Swiper == "undefined"){
            var script = document.createElement("script");
            script.src = "lib/littlee/plugins/swiper/swiper-3.4.2.jquery.min.js";
            document.getElementById("plugin").appendChild(script);
            var link = document.createElement('link');
            link.href = "css/swiper-3.4.2.min.css";
            link.rel = "stylesheet";
            document.getElementById("plugin").appendChild(link);
        }
        var func = function(){
            if(typeof Swiper == "undefined"){
                setTimeout(func, 5);
                return;
            }
            $(".myapp:visible .swiper-container").each(function(i,n){
                var _t = $(n);
                var params = MySwiper._getParams(_t);
                MySwiper.myswipers.push(new Swiper('.swiper-container', params));
            });
        }
        func();
    },
    _getParams: function(_t){
        var params = {
            spaceBetween : 0,
            loop : true,
            pagination : '.swiper-pagination',
            paginationType : 'bullets',
            paginationClikable : true,
            // paginationBulletRender :function(index,className){
            //     return '<span class = "'+className+'>'+(index+1)+"</span>";
            // },
            centeredSlides : true,
            // autoplay: 3000,/*轮播间隔时间*/
            autoplayDisableOnInteraction: false,
            effect : 'slide'
        };
        var key = "spaceBetween,lp,pagination,paginationType,paginationClikable,centeredSlides,effect,autoplayDisableOnInteraction,auto,freeMode,slidesPerView";
        var _params = _t.getQueryAttr(key);
        for(var i in _params){
            if(_params[i] != null){
                params[i] = _params[i];
            }
        }
        if((typeof params.auto != 'undefined') && (params.auto != null))params.autoplay = params.auto;
        if((typeof params.lp != 'undefined') && (params.lp != null))params.loop = (params.lp == 'false')?false:true;
        if((typeof params.centeredSlides != 'undefined') && (params.centeredSlides != null))params.centeredSlides = (params.centeredSlides == 'false')?false:true;
        return params;
    },
    destroy: function(){
        MySwiper.myswipers = [];
    }
} 
plugins.MySwiper = MySwiper;
MySwiper.init();
