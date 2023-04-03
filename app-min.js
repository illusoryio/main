async function loadClerk(){return new Promise((e=>{const t="clerk.a7i81.ec7ck.lcl.dev",s=document.createElement("script");s.setAttribute("data-clerk-frontend-api",t),s.async=!0,s.src=`https://${t}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`,s.addEventListener("load",(async function(){await window.Clerk.load({}),clerkResolved()})),document.body.appendChild(s),setTimeout((()=>{e()}),100)}))}async function supaToken(){let e;try{e=await window.Clerk.session.getToken({template:"supabase-auth"})}catch(t){e="Invalid token"}return e}async function supaClerk(e){let t;try{const{createClient:s}=supabase;t=await s("https://supa.illusory.io","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cWxvYndqd2Jib3VzZ2Rod3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1ODk4ODYsImV4cCI6MTk5MjE2NTg4Nn0.nla93WMcf1pNyFXZ5_1sniMD97CYj8y9lF5zKif2TrI",{global:{headers:{Authorization:`Bearer ${e}`}}})}catch(e){t="Invalid Supabase Client"}return t}async function supaClient(){const e=await supaToken();return await supaClerk(e)}async function clerkActions(e,t){"user_get_proxies"==t&&await getProxies(e)}const lsc=(e,t)=>new Promise(((s,r)=>{const n=document.createElement("script");n.type="text/javascript",n.addEventListener("load",(()=>{s({loaded:t+" loaded...",error:!1})})),n.onerror=r,n.src=e,n.async=!1,document.body.append(n)}));async function lscTimeAgo(){var e,t;await(e="https://cdnjs.cloudflare.com/ajax/libs/timeago.js/4.0.2/timeago.full.min.js",t="timeago.full.min.js",new Promise(((s,r)=>{const n=document.createElement("script");n.type="text/javascript",n.addEventListener("load",(()=>{s({loaded:t+" loaded...",error:!1})})),n.onerror=r,n.src=e,n.async=!1,document.body.append(n)}))).then((e=>{})).catch((e=>{}))}async function getProxies(e){const{data:t,error:s}=await e.from("proxies_restricted").select().order("proxy_name",{ascending:!0});return new Promise((e=>{setTimeout((()=>{if(s);else{const e=document.getElementsByClassName("cards-v2")[0];e.innerHTML="";for(var r=t,n=0,a=0;a<r.length;a++){var i=r[a];const t=document.createElement("div");t.setAttribute("prx_card",i.proxy_name),t.classList.add("prx_crd_v2"),t.setAttribute("onclick","interact(this)"),t.setAttribute("interact",i.proxy_name),e.appendChild(t);const s=document.createElement("div");s.classList.add("prx_crd_top"),t.appendChild(s);const _=document.createElement("div");_.classList.add("prx_crd_ti_v2"),_.setAttribute("prx_res_timer",i.proxy_name),s.appendChild(_);const h=document.createElement("div");h.classList.add("prx_crd_tit_sec_v2"),h.classList.add("w-clearfix"),s.appendChild(h);const w=document.createElement("div");w.classList.add("ico_rot_v2"),w.classList.add("w-embed"),h.appendChild(w);const f=new Image;f.src="https://assets.website-files.com/601983fb7d31a9e2fe9f0840/61aa903bc84f5b905f432b4f_rotate-cw.svg",f.setAttribute("onclick","resetProxy(this.id)"),f.setAttribute("id","reset_"+i.proxy_name),w.appendChild(f);const g=document.createElement("div");g.classList.add("prx_crd_det_v2"),h.appendChild(g);const $=document.createElement("div");$.classList.add("crd_tit_v2"),$.classList.add("smaller"),$.innerHTML=i.proxy_name,$.setAttribute("crd_tit",i.proxy_name),h.appendChild($);const v=document.createElement("div");v.classList.add("prx_subtxt_v2"),v.setAttribute("crd_ports",i.proxy_name),v.classList.add("smaller"),v.innerHTML="HTTP "+i.h_port+" • SOCKS5 "+i.s_port,h.appendChild(v);const y=document.createElement("div");if(y.classList.add("ind_wrp_v2"),y.classList.add("w-clearfix"),s.appendChild(y),"AT&T"==i.isp)var o="blue";else if("Verizon"==i.isp)o="red";else if("T-Mobile"==i.isp)o="pink";const b=document.createElement("div");b.classList.add("ind_v3"),b.classList.add(o),b.innerHTML=i.isp,b.setAttribute("crd_isp",i.proxy_name),y.appendChild(b);const x=document.createElement("div");x.classList.add("ind_v3"),x.classList.add("purple"),x.innerHTML=i.location,x.setAttribute("crd_loc",i.proxy_name),y.appendChild(x);const L=document.createElement("div");if(L.classList.add("ind_v3"),L.classList.add("light-blue"),L.innerHTML=parseInt(i.h_threads)+parseInt(i.s_threads)+" threads",L.setAttribute("crd_threads",i.proxy_name),y.appendChild(L),i.traffic<1024)var c="Bytes",d=1;else if(i.traffic>=1024&&i.traffic<1048576)c="KB",d=1024;else if(i.traffic>=1048576&&i.traffic<1073741824)c="MB",d=1048576;else if(i.traffic>=1073741824&&i.traffic<1099511627776)c="GB",d=1073741824;else if(i.traffic>=1099511627776)c="TB",d=1099511627776;if(i.traffic<1024)var l=parseInt(i.traffic)/parseInt(d)+" "+c;else l=(parseInt(i.traffic)/parseInt(d)).toFixed(2)+" "+c;const I=document.createElement("div");if(I.classList.add("ind_v3"),I.classList.add("light-blue"),I.innerHTML=l,I.setAttribute("crd_traffic",i.proxy_name),y.appendChild(I),1==i.auto_change)var u="green",m="auto-change updating",p="auto_change_on";else u="grey",m="auto-change off",p="auto_change_off";const k=document.createElement("div");k.classList.add("ind_v3"),k.classList.add(p),k.classList.add(u),k.innerHTML=m,k.setAttribute("crd_auto",i.proxy_name),k.setAttribute("datetime",i.next_ip_change),y.appendChild(k);const S=document.createElement("div");S.classList.add("ind_v3"),S.classList.add("last_ip_change"),S.setAttribute("datetime",i.last_ip_change),S.innerHTML="ip change updating",S.setAttribute("crd_last_ip_change",i.proxy_name),y.appendChild(S);const T=document.createElement("div");T.classList.add("ind_v3"),T.classList.add("last_reboot"),T.setAttribute("datetime",i.last_reboot),T.innerHTML="reboot updating",T.setAttribute("crd_last_reboot",i.proxy_name),y.appendChild(T);document.getElementById("mod_x").setAttribute("onclick","closeModal(this)"),n=parseInt(n)+1,document.querySelector("#all_isps_cnt").innerHTML=n}}e()}),200)}))}async function rpcProxy(e){await e.channel("proxies_restricted").on("UPDATE",(e=>{const t=e.new.proxy_name,s=(e.new.auth_method,e.new.auto_change),r=e.new.auto_change_time,n=e.new.h_port,a=e.new.h_threads,i=e.new.isp,o=(e.new.last_auto_check,e.new.last_ip_change),c=e.new.last_reboot,d=e.new.location,l=e.new.next_ip_change,u=(e.new.online,e.new.online_webhook,e.new.password),m=(e.new.product,e.new.proxy_admin,e.new.s_port),p=e.new.s_threads,_=e.new.server_ip,h=e.new.traffic,w=e.new.username,f=e.new.whitelist;if(h<1024)var g="Bytes",v=1;else if(h>=1024&&h<1048576)g="KB",v=1024;else if(h>=1048576&&h<1073741824)g="MB",v=1048576;else if(h>=1073741824&&h<1099511627776)g="GB",v=1073741824;else if(h>=1099511627776)g="TB",v=1099511627776;if(h<1024)var y=parseInt(h)/parseInt(v)+" "+g;else y=(parseInt(h)/parseInt(v)).toFixed(2)+" "+g;document.querySelector("[crd_ports="+t+"]").innerHTML="HTTP "+n+" • SOCKS5 "+m,document.querySelector("[crd_isp="+t+"]").innerHTML=i,document.querySelector("[crd_loc="+t+"]").innerHTML=d,document.querySelector("[crd_threads="+t+"]").innerHTML=parseInt(a)+parseInt(p)+" threads",document.querySelector("[crd_traffic="+t+"]").innerHTML=y,1==s?(document.querySelector("[crd_auto="+t+"]").classList.remove("grey"),document.querySelector("[crd_auto="+t+"]").classList.remove("auto_change_off"),document.querySelector("[crd_auto="+t+"]").classList.add("green"),document.querySelector("[crd_auto="+t+"]").classList.add("auto_change_on"),document.querySelector("[crd_auto="+t+"]").innerHTML="auto-change updating",document.querySelector("[crd_auto="+t+"]").setAttribute("datetime",l)):(timeago.cancel(document.querySelector("[crd_auto="+t+"]")),document.querySelector("[crd_auto="+t+"]").classList.remove("green"),document.querySelector("[crd_auto="+t+"]").classList.remove("auto_change_on"),document.querySelector("[crd_auto="+t+"]").classList.add("grey"),document.querySelector("[crd_auto="+t+"]").classList.add("auto_change_off"),document.querySelector("[crd_auto="+t+"]").innerHTML="auto-change off",document.querySelector("[crd_auto="+t+"]").setAttribute("datetime","")),document.querySelector("[crd_last_ip_change="+t+"]").setAttribute("datetime",o),document.querySelector("[crd_last_reboot="+t+"]").setAttribute("datetime",c);var b=window.location.search;if(new URLSearchParams(b).get("proxy")==t){$("#currentProxy").html(t),$("#cp-autoMinOnly").val(r),$("#cp-isp").html(i),$("#cp-loc").html(d),$("#cp-threads").html(p+a+" Threads"),$("#cp-traffic").html(h),$("#cp-lastReset").attr("datetime",o),$("#cp-lastReboot").attr("datetime",c),$("#uname").html(w),$("#pword").html(u),$("#unameInput").val(w),$("#pwordInput").val(u),$("#whitelistIp").val(f),$("#serverIp").html(_),$("#httpPort").html(n),$("#socksPort").html(m),timeago.cancel(document.getElementById("cp-lastReset")),timeago.cancel(document.getElementById("cp-lastReboot")),async function(){await modal_time_ago()}()}!async function(){await getTimeAgoManual(),await getTimeAgoReboot(),1==s&&await getTimeAgoAuto()}()})).subscribe()}async function interact(e){await openModal(),$(".prx_crd_v2").css({border:"1px solid #111314","background-color":"#080909",transition:".1s"}),$(e).css({border:"#6dffa8 0.15rem solid","background-color":"#141517",transition:".1s"});var t=e.getAttribute("interact");const{data:s,error:r}=await supabaseClient.from("proxies_restricted").select().eq("proxy_name",t);return new Promise((e=>{if(r)$("#successMsg").hide(),$("#errorMsg").hide(),$("#errorMsg").show(),$("#errorTxt").html(r.response.data.message);else{window.localStorage.setItem("currentProxy",t),document.title=t;var n=new URLSearchParams(window.location.search);n.set("proxy",t),history.replaceState(null,null,"?"+n.toString());var a=s[0].online,i=s[0].username,o=s[0].password,c=s[0].server_ip,d=s[0].h_port,l=s[0].s_port,u=(s[0].online_webhook,s[0].whitelist),m=s[0].last_ip_change,p=s[0].last_reboot,_=s[0].s_threads,h=s[0].h_threads,w=s[0].location,f=s[0].isp,g=s[0].traffic,v=s[0].auto_change,y=s[0].auto_change_time,b=s[0].auth_method;$("#currentProxy").html(t),$("#cp-autoMinOnly").val(y),$("#cp-isp").html(f),$("#cp-loc").html(w),$("#cp-threads").html(_+h+" Threads"),$("#cp-traffic").html(g),$("#cp-lastReset").html(m),$("#cp-lastReboot").html(p),$("#cp-lastReset").attr("datetime",m),$("#cp-lastReboot").attr("datetime",p),$("#uname").html(i),$("#pword").html(o),$("#unameInput").val(i),$("#pwordInput").val(o),$("#whitelistIp").val(u),$("#serverIp").html(c),$("#httpPort").html(d),$("#socksPort").html(l),1==a?($("#cp-online").show(),$("#cp-offline").hide()):($("#cp-online").hide(),$("#cp-offline").show()),"creds"==b?($("#userPassSel").click(),$("#authMethodConf").html("Username & Password Selected")):($("#whitelistIpSel").click(),$("#authMethodConf").html("Whitelist IP Selected")),null==i?($("#userPassSelNone").show(),$("#userPassSelSet").hide()):($("#userPassSelNone").hide(),$("#userPassSelSet").show()),null==u?($("#whitelistSelNone").show(),$("#whitelistSelSet").hide()):($("#whitelistSelNone").hide(),$("#whitelistSelSet").show()),1==v?($("#autoChangeOn").css("display","flex"),$("#autoChangeOnLine, #autoChangeOnRow").show(),$("#autoChangeOff").hide()):($("#autoChangeOff").css("display","flex"),$("#autoChangeOn, #autoChangeOnLine, #autoChangeOnRow").hide()),$("#auth_options").hide(),async function(){await modal_time_ago(),await hide_skel_mod()}()}setTimeout((()=>{e("Got modal details...")}),100)}))}async function modalStart(){return new Promise((e=>{document.getElementById("prx_mod").setAttribute("open",!1),setTimeout((()=>{e("Set open: false.")}),100)}))}async function openModal(){return await show_skel_mod(),new Promise((e=>{$("#prx_mod").css("display","flex"),$(".crd_wrp").hide();document.getElementById("prx_mod").setAttribute("open",!0),setTimeout((()=>{e("Opened")}),100)}))}async function closeModal(){return new Promise((e=>{const t=document.getElementById("prx_mod");$("#prx_mod").hide(),$(".crd_wrp").show(),$(".auth-select-wrap").hide(),$(".webhook-online-trigger-wrap").hide(),t.setAttribute("open",!1),setTimeout((()=>{e("Closed")}),100)}))}async function navStart(){return new Promise((e=>{setTimeout((()=>{document.getElementById("nav_sb").setAttribute("open",!0),e("Set open: true.")}),100)}))}async function openNav(){return await show_skel_mod(),new Promise((e=>{setTimeout((()=>{document.getElementById("nav_sb").setAttribute("open",!0),e("Opened")}),100)}))}async function hide_skel_dash(){return new Promise((e=>{setTimeout((()=>{$(".crd_wrp").show(),$(".skel_cnt_active").hide(),$(".crd_skel_wrp").hide(),e("Hid card skeletons")}),100)}))}async function hide_skel_mod(){return new Promise((e=>{setTimeout((()=>{document.querySelectorAll(".skel_mod").forEach((function(e){e.style.display="none"})),document.querySelectorAll(".skel_light").forEach((function(e){e.style.display="none"})),e("Hid mod skeletons")}),100)}))}async function show_skel_mod(){return new Promise((e=>{setTimeout((()=>{document.querySelectorAll(".skel_mod").forEach((function(e){e.style.display="block"})),document.querySelectorAll(".skel_light").forEach((function(e){e.style.display="block"})),e("Unhid mod skeletons")}),100)}))}function iniIx2(){return new Promise((e=>{setTimeout((()=>{$(document).ready((function(){window.Webflow&&window.Webflow.require("ix2").init(),document.dispatchEvent(new CustomEvent("IX2_PREVIEW_LOAD"))})),e()}),500)}))}async function change_ip(){var e=localStorage.getItem("currentProxy"),{data:{user:t}}=await supabaseClient.auth.getUser();let{data:s,error:r}=await supabaseClient.rpc("dash_func_change_ip_v3",{name_input:e,change_ip_input:!0,origin_input:"dashboard"})}async function reboot_device(){var e=localStorage.getItem("currentProxy"),{data:{user:t}}=await supabaseClient.auth.getUser();let{data:s,error:r}=await supabaseClient.rpc("dash_func_reboot_v1",{name_input:e,reboot_input:!0,email_input:t.email,origin_input:"dashboard"})}async function pageInit(){await loadClerk()}async function clerkResolved(){const e=await supaClient();await clerkActions(e,"user_get_proxies"),await lscRpcProxy(),await lscTimeAgo(),await navStart(),await modalStart(),await iniIx2(),await hide_skel_dash()}$("#cea_mod, #cea_nav").click((function(e){$(document).ready((function(){var t=document.getElementById(e.target.id),s=document.getElementById("prx_mod"),r=document.getElementById("nav_sb"),n=s.getAttribute("open"),a=r.getAttribute("open");if("cea_mod"==t.id)if("true"==n){var i="false";s.setAttribute("open",i)}else{i="true";s.setAttribute("open",i)}else if("true"==n)i="true";else i="false";if("cea_nav"==t.id)if("true"==a){var o="false";r.setAttribute("open",o)}else{o="true";r.setAttribute("open",o)}else if("true"==a)o="true";else o="false";"true"==o&&"false"==i&&($(window).width()>=1800&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr 1fr 1fr"}),$(".crds_col").css({width:"89%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1799&&$(window).width()>1600&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr 1fr"}),$(".crds_col").css({width:"87%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1599&&$(window).width()>1451&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr 1fr"}),$(".crds_col").css({width:"85%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1450&&$(window).width()>1281&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr"}),$(".crds_col").css({width:"84%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1280&&$(window).width()>1081&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr"}),$(".crds_col").css({width:"81%"}),$(".ind_wrp_v2").css({"margin-right":"0"})),$(window).width()<=1080&&$(window).width()>881&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr"}),$(".crds_col").css({width:"77%"}),$(".ind_wrp_v2").css({"margin-right":"0"})),$(window).width()<=880&&$(window).width()>680&&($(".cards-v2").css({"grid-template-columns":"1fr"}),$(".crds_col").css({width:"70%"}),$(".ind_wrp_v2").css({"margin-right":"0"}))),$(window).resize((function(){"true"==o&&"false"==i&&($(window).width()>=1800&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr 1fr 1fr"}),$(".crds_col").css({width:"89%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1799&&$(window).width()>1600&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr 1fr"}),$(".crds_col").css({width:"87%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1599&&$(window).width()>1451&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr 1fr"}),$(".crds_col").css({width:"85%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1450&&$(window).width()>1281&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr"}),$(".crds_col").css({width:"84%"}),$(".ind_wrp_v2").css({"margin-right":"3rem"})),$(window).width()<=1280&&$(window).width()>1081&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr"}),$(".crds_col").css({width:"81%"}),$(".ind_wrp_v2").css({"margin-right":"0"})),$(window).width()<=1080&&$(window).width()>881&&($(".cards-v2").css({"grid-template-columns":"1fr 1fr"}),$(".crds_col").css({width:"77%"}),$(".ind_wrp_v2").css({"margin-right":"0"})),$(window).width()<=880&&$(window).width()>680&&($(".cards-v2").css({"grid-template-columns":"1fr"}),$(".crds_col").css({width:"70%"}),$(".ind_wrp_v2").css({"margin-right":"0"})))}))}))})),$(".add_min").click((function(){$(this).prev().val()<1440&&$(this).prev().val(+$(this).prev().val()+1)})),$(".sub_min").click((function(){$(this).next().val()>1&&$(this).next().val()>1&&$(this).next().val(+$(this).next().val()-1)})),$("#change_ip_mod").click((function(){change_ip()})),$("#reboot_mod").click((function(){reboot_device()})),pageInit();