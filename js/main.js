jQuery(document).ready(function ($) {

    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper('endsWith', function(arg1, arg2, options) {
        return (arg1.endsWith(arg2)) ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper('contains', function(arg1, arg2, options) {
        return (arg1.indexOf(arg2) != -1) ? options.fn(this) : options.inverse(this);
    });

    $('#nav-script').load('partials/nav.html', function () {
        var template = Handlebars.compile($('#nav-template').html());
        var data = {'pathName': window.location.pathname}
        $('#nav-partial').append(template(data));
    });

    $('#footer-script').load('partials/footer.html', function () {
        var template = Handlebars.compile($('#footer-template').html());
        $('#footer-partial').append(template());
    });

    // for scrolling to bottom of expanded section in about.html
    $("#collapseAbout").on("shown.bs.collapse", function () {
        $("html, body").animate({
            scrollTop: $(document).height() },
            "slow");
        return false;
    });

});

// load iframe AFTER page loads and scroll to venues in viewport
function lazyLoad() {
    $('iframe').each(function () {
        var frame = $(this),
            vidSource = $(frame).attr('data-src'),
            distance = $(frame).offset().top - $(window).scrollTop(),
            distTopBot = window.innerHeight - distance,
            distBotTop = distance + $(frame).height();

        if (distTopBot >= 0 && distBotTop >= 0) { // if frame is partly in view
            $(frame).attr('src', vidSource);
            $(frame).removeAttr('data-src');
        }
    });
}

var throttled = _.throttle(lazyLoad, 100);
$(window).scroll(throttled);
