/**
 * Created by paul on 2017/6/20.
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                "Firefox >= 20",
                "ie >= 11",
                'Chrome >= 58'
            ]
        })
    ]
};