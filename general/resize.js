/*
resize.js (c) 2023
Desc: Resizing dashboard
Created:  2023-04-01T21:32:41.955Z
Modified: 2023-04-01T21:38:16.518Z
*/

$("#cea_mod, #cea_nav").click(function (e) {
    $(document).ready(function () {
        // $(".crds_col").css({
        //   width: "auto",
        // });

        var clicked = document.getElementById(e.target.id);
        var prxMod = document.getElementById("prx_mod");
        var navSb = document.getElementById("nav_sb");

        var modOpen = prxMod.getAttribute("open");
        var navOpen = navSb.getAttribute("open");

        if (clicked.id == "cea_mod") {
            console.log(clicked.id);
            if (modOpen == "true") {
                var modOpenNew = "false";
                prxMod.setAttribute("open", modOpenNew);
            } else {
                var modOpenNew = "true";
                prxMod.setAttribute("open", modOpenNew);
            }
        } else {
            if (modOpen == "true") {
                var modOpenNew = "true";
            } else {
                var modOpenNew = "false";
            }
        }

        if (clicked.id == "cea_nav") {
            if (navOpen == "true") {
                var navOpenNew = "false";
                navSb.setAttribute("open", navOpenNew);
            } else {
                var navOpenNew = "true";
                navSb.setAttribute("open", navOpenNew);
            }
        } else {
            if (navOpen == "true") {
                var navOpenNew = "true";
            } else {
                var navOpenNew = "false";
            }
        }

        //current sizing

        if (navOpenNew == "true" && modOpenNew == "false") {
            if ($(window).width() >= 1800) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr 1fr 1fr",
                });
                $(".crds_col").css({
                    width: "89%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }
            if ($(window).width() <= 1799 && $(window).width() > 1600) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr 1fr",
                });
                $(".crds_col").css({
                    width: "87%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }

            if ($(window).width() <= 1599 && $(window).width() > 1451) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr 1fr",
                });
                $(".crds_col").css({
                    width: "85%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }

            if ($(window).width() <= 1450 && $(window).width() > 1281) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr",
                });
                $(".crds_col").css({
                    width: "84%",
                });
                $(".ind_wrp_v2").css({
                    "margin-right": "3rem",
                });
            }

            if ($(window).width() <= 1280 && $(window).width() > 1081) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr",
                });

                $(".crds_col").css({
                    width: "81%",
                });

                $(".ind_wrp_v2").css({
                    "margin-right": "0",
                });
            }

            if ($(window).width() <= 1080 && $(window).width() > 881) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr 1fr",
                });

                $(".crds_col").css({
                    width: "77%",
                });

                $(".ind_wrp_v2").css({
                    "margin-right": "0",
                });
            }

            if ($(window).width() <= 880 && $(window).width() > 680) {
                $(".cards-v2").css({
                    "grid-template-columns": "1fr",
                });

                $(".crds_col").css({
                    width: "70%",
                });

                $(".ind_wrp_v2").css({
                    "margin-right": "0",
                });
            }
        }

        // resize

        $(window).resize(function () {
            if (navOpenNew == "true" && modOpenNew == "false") {
                if ($(window).width() >= 1800) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr 1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "89%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }
                if ($(window).width() <= 1799 && $(window).width() > 1600) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "87%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }

                if ($(window).width() <= 1599 && $(window).width() > 1451) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "85%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }

                if ($(window).width() <= 1450 && $(window).width() > 1281) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr",
                    });
                    $(".crds_col").css({
                        width: "84%",
                    });
                    $(".ind_wrp_v2").css({
                        "margin-right": "3rem",
                    });
                }

                if ($(window).width() <= 1280 && $(window).width() > 1081) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr",
                    });

                    $(".crds_col").css({
                        width: "81%",
                    });

                    $(".ind_wrp_v2").css({
                        "margin-right": "0",
                    });
                }

                if ($(window).width() <= 1080 && $(window).width() > 881) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr 1fr",
                    });

                    $(".crds_col").css({
                        width: "77%",
                    });

                    $(".ind_wrp_v2").css({
                        "margin-right": "0",
                    });
                }

                if ($(window).width() <= 880 && $(window).width() > 680) {
                    $(".cards-v2").css({
                        "grid-template-columns": "1fr",
                    });

                    $(".crds_col").css({
                        width: "70%",
                    });

                    $(".ind_wrp_v2").css({
                        "margin-right": "0",
                    });
                }
            }
        });
    });
});