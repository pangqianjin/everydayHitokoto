import React, { Component } from 'react'
import axios from 'axios'
import Pubsub from 'pubsub-js'

export default class Header extends Component {
    
    search = (c)=>{
        return ()=>{
            Pubsub.publish('addHitokotos', {isFirst: false, isLoading: true})
            axios.get(`https://v1.hitokoto.cn/?c=${c}`).then(
                response=>{
                    const {from, hitokoto} = response.data
                    Pubsub.publish('addHitokotos', {isLoading: false, from, hitokoto})
                },
                error=>{
                    Pubsub.publish('addHitokotos', {isLoading: false, err: error.message})
                    console.log(error)
                }
            )
        }
    }

    render() {
        return (
            <div>	
                <button onClick={this.search('b')}>动画</button>&nbsp;
                <button onClick={this.search('c')}>游戏</button>&nbsp;
                <button onClick={this.search('d')}>文学</button>&nbsp;
                <button onClick={this.search('e')}>原创</button>&nbsp;
                <button onClick={this.search('f')}>来自网络</button>&nbsp;
                <button onClick={this.search('g')}>其他</button>&nbsp;
                <button onClick={this.search('h')}>影视</button>&nbsp;
                <button onClick={this.search('i')}>诗词</button>&nbsp;
                <button onClick={this.search('j')}>网易云</button>&nbsp;
                <button onClick={this.search('k')}>哲学</button>&nbsp;
                <button onClick={this.search('l')}>抖机灵</button>
            </div>
        )
    }
}
