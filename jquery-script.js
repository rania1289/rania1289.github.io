$(document).ready(function() {

    var textes = ["Étudiante en Informatique", "Développeuse Web", "Passionnée de Code"];
    var indexTexte = 0;
    var indexLettre = 0;
    var entrain = true;

    function animerTexte() {
        var texteCourant = textes[indexTexte];

        if (entrain) {
            $('#texte-anime').text(texteCourant.substring(0, indexLettre + 1));
            indexLettre++;
            if (indexLettre === texteCourant.length) {
                entrain = false;
                setTimeout(animerTexte, 1500);
                return;
            }
        } else {
            $('#texte-anime').text(texteCourant.substring(0, indexLettre - 1));
            indexLettre--;
            if (indexLettre === 0) {
                entrain = true;
                indexTexte = (indexTexte + 1) % textes.length;
            }
        }
        setTimeout(animerTexte, entrain ? 100 : 60);
    }

    animerTexte();


    function animerBarres() {
        var positionSection = $('#skills').offset().top;
        var positionScroll = $(window).scrollTop() + $(window).height();

        if (positionScroll > positionSection) {
            $('.skill-fill').each(function() {
                var largeur = $(this).data('width');
                $(this).animate({ width: largeur }, 1000);
            });
        }
    }

    $(window).scroll(function() {
        animerBarres();
    });

    animerBarres();


    $('.timeline-item').click(function() {
        $(this).find('p').slideToggle(300);
    });


    $('.tag').hover(
        function() {
            $(this).animate({ paddingLeft: '20px', paddingRight: '20px' }, 200);
        },
        function() {
            $(this).animate({ paddingLeft: '14px', paddingRight: '14px' }, 200);
        }
    );


    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 80;

        $('section, header').each(function() {
            var id = $(this).attr('id');
            var debut = $(this).offset().top;
            var fin = debut + $(this).outerHeight();

            if (scrollPos >= debut && scrollPos < fin) {
                $('#navbar a').removeClass('active');
                $('#navbar a[href="#' + id + '"]').addClass('active');
            }
        });
    });


    $('#navbar a').click(function(e) {
        e.preventDefault();
        var cible = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(cible).offset().top
        }, 600);
    });

});