<template>
    <div>
        <div class='wrapper'>
            <div class='body'>
                <div class='body-circle'>
                    <div class='body-circle-inner'>
                        <div class='center'></div>
                        <div class='stroke top'></div>
                        <div class='stroke left'></div>
                        <div class='stroke right'></div>
                        <div class='stroke bottom'></div>
                    </div>
                </div>
                <div class='body-circle left'>
                    <div class='body-circle-inner'>
                        <div class='center'></div>
                        <div class='stroke top'></div>
                        <div class='stroke left'></div>
                        <div class='stroke right'></div>
                        <div class='stroke bottom'></div>
                    </div>
                </div>
                <div class='body-circle right'>
                    <div class='body-circle-inner'>
                        <div class='center'></div>
                        <div class='stroke top'></div>
                        <div class='stroke left'></div>
                        <div class='stroke right'></div>
                        <div class='stroke bottom'></div>
                    </div>
                </div>
                <div class='body-circle bottom'>
                    <div class='body-circle-inner'>
                        <div class='center'></div>
                        <div class='stroke top'></div>
                        <div class='stroke left'></div>
                        <div class='stroke right'></div>
                        <div class='stroke bottom'></div>
                    </div>
                </div>
            </div>
            <div class='antenna'></div>
            <div class='head'>
                <div class='top-grey-stripe'></div>
                <div class='top-orange-stripe'></div>
                <div class='middle-eye'>
                    <div class='middle-eye-color'>
                        <div class='middle-eye-glow'></div>
                    </div>
                </div>
                <div class='right-eye'>
                    <div class='right-eye-inner'></div>
                </div>
                <div class='left-detail'></div>
                <div class='right-detail'></div>
                <div class='bottom-stripe'></div>
            </div>
            <div class='shadow'></div>
            <div class='shadow-head'></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loading'
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    $grey: #96a0a5;
    $orange: #e88218;
    $white: #d3d8d6;

    @keyframes body-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes head-rotate {
        0%, 100% {
            transform: rotate(15deg) translate(10px, 30px);
        }
        50% {
            transform: rotate(-15deg) translate(-10px, -30px);
        }
    }

    @keyframes head-shadow {
        0%, 100% {
            transform: translate(10px, 0) rotate(5deg);
        }
        50% {
            transform: translate(-10px, 0) rotate(10deg);
        }
    }

    .body {
        animation: body-rotate 1s infinite;
        animation-timing-function: linear;
        background-color: $white;
        border-radius: 50px;
        height: 100px;
        left: 50px;
        overflow: hidden;
        position: absolute;
        top: 140px;
        width: 100px;
        z-index: 1;

        .body-circle {
            background: $orange;
            border-radius: 25px;
            height: 50px;
            left: 20px;
            position: absolute;
            transform: rotate(35deg);
            top: 20px;
            width: 50px;

            .body-circle-inner {
                background: $white;
                border-radius: 20px;
                left: 5px;
                height: 40px;
                position: absolute;
                top: 5px;
                width: 40px;
                z-index: 2;

                .center {
                    background: $grey;
                    border-radius: 10px;
                    height: 20px;
                    left: 10px;
                    position: absolute;
                    top: 10px;
                    width: 20px;
                }

                .stroke {
                    background: $orange;
                    border-radius: 2px;
                    height: 10px;
                    position: absolute;
                    top: -1px;
                    width: 5px;

                    &.top {
                        left: 18px;
                    }
                    &.left {
                        height: 5px;
                        left: -1px;
                        top: 18px;
                        width: 10px;
                    }
                    &.right {
                        height: 5px;
                        left: 31px;
                        top: 18px;
                        width: 10px;
                    }
                    &.bottom {
                        height: 10px;
                        left: 18px;
                        top: 31px;
                        width: 5px;
                    }
                }
            }

            &.left {
                left: -35px;
                top: 45px;
                transform: rotate(65deg);
            }

            &.right {
                left: 78px;
                top: 5px;
                transform: rotate(35deg);
            }

            &.bottom {
                left: 40px;
                top: 80px;
                transform: rotate(80deg);
            }
        }
    }

    .head {
        animation: head-rotate 3s infinite;
        animation-timing-function: ease-in-out;
        background-color: $white;
        border-radius: 75px 75px 0 0;
        height: 37.5px;
        overflow: hidden;
        left: 62.5px;
        position: absolute;
        top: 105px;
        transform-origin: 150px 80px;
        width: 75px;
        z-index: 2;

        .top-grey-stripe {
            background-color: $grey;
            height: 5px;
            margin-top: 2px;
        }
        .top-orange-stripe {
            background-color: $orange;
            height: 3px;
            margin-top: 2px;
        }

        .middle-eye {
            background-color: $white;
            border-radius: 8px;
            margin: 0 auto;
            margin-top: -3px;
            height: 25px;
            width: 25px;

            .middle-eye-color {
                background-color: black;
                border-radius: 5px;
                height: 10px;
                margin: 0 auto;
                width: 10px;

                .middle-eye-glow {
                    background: radial-gradient(red, black);
                    border-radius: 2.5px;
                    height: 5px;
                    transform: translate(1px, 3px);
                    width: 5px;
                }
            }
        }
        .right-eye {
            background-color: black;
            border-radius: 4px;
            float: right;
            height: 8px;
            transform: translate(-20px, -10px);
            width: 8px;

            .right-eye-inner {
                border: 1px solid $white;
                border-radius: 2px;
                height: 4px;
                margin-top: 1px;
                margin-left: 1px;
                width: 4px;
            }
        }

        .left-detail {
            background-color: $orange;
            height: 5px;
            transform: translate(0, -5px);
            width: 20px;

            &:after {
                background: $white;
                content: '';
                height: 5px;
                position: absolute;
                transform: translateX(5px);
                width: 3px;
            }
            &:before {
                background: $white;
                content: '';
                height: 5px;
                position: absolute;
                transform: translateX(10px);
                width: 4px;
            }
        }
        .right-detail {
            background-color: $orange;
            float: right;
            height: 5px;
            transform: translate(15px, -10px);
            width: 20px;

            &:after {
                background: $white;
                content: '';
                height: 5px;
                position: absolute;
                transform: translateX(5px);
                width: 3px;
            }
            &:before {
                background: $white;
                content: '';
                height: 5px;
                position: absolute;
                transform: translateX(10px);
                width: 4px;
            }
        }

        .bottom-stripe {
            background-color: $grey;
            border: 1px solid black;
            height: 2px;
            transform: translate(-1px, -5px);
            width: 100%;
        }
    }

    .shadow {
        background: grey;
        border-radius: 100%;
        height: 40px;
        left: 40px;
        position: absolute;
        top: 220px;
        width: 100px;
    }

    .shadow-head {
        animation: head-shadow 3s infinite;
        animation-timing-function: ease-in-out;
        background: grey;
        border-radius: 0 0 30px 30px;
        height: 30px;
        left: 50px;
        position: absolute;
        top: 255px;
        width: 60px;
    }

    .wrapper {
        height: 300px;
        width: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -65%, 0);
    }
</style>