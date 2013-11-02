/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:05 PM
 */

require.config({
    baseUrl: '/js',

    paths: {
        sockjs: "http://cdn.sockjs.org/sockjs-0.3.min"
    }

});

require(['main']);