import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const highlight = {}
highlight.install = function(Vue){
  Vue.directive('highlight', {
    inserted: function(el){
      const blocks = el.querySelectorAll('pre code')
      for(let i = 0; i< blocks.length ;i++){
        hljs.highlightBlock(blocks[i])
      }
    },
    componentUpdated: function(el){
      const blocks = el.querySelectorAll('pre code')
      for(let i = 0; i< blocks.length; i++){
        hljs.highlightBlock(blocks[i])
      }
    }
  })
}

export default highlight