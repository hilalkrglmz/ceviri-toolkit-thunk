import { useEffect, useMemo, useState } from "react"
import "./style.scss"
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, translateText } from "./redux/translateAction"
import Select from "react-select"
import store from "./redux/store"
import { setTranslated } from "./redux/translateSlice"


const App = () => {

  const state= useSelector((store) => store.translate)
  const dispatch = useDispatch()
  const[text, setText] =useState('')

  const [sourceLang,setSourceLang] = useState(
    {
      label:'English',
      value:'en'
    }
  )
  const [targetLang,setTargetLang] = useState(
    {
      label:'Turkish',
      value:'tr'
    }
  )


 /* dil verilerini alıp store a aktarır */
useEffect(()=> {
  dispatch(getLanguages())
} ,[])


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


/* API'den gelen obje içindeki dil değerleri code ve name şeklinde 
geliyor. Ancak bizim kullandığımız react-select için verilerin yukarıda da 
görüldüğü üzere value ve label olarak geldiğini görüyoruz.
Bu noktada code ve name değerlerini label ve value değerleribe döndürmemiz
gerekir.*/

const refined = useMemo( () => 
  state.languages.map((lang) => ({
  label:lang.name,
  value: lang.code
})),
[state.languages]

)

/* dilleri değiştir */
const handleSwap = () => {

  setTargetLang(sourceLang);
  setSourceLang(targetLang);

  /* alttaki çeviriyi üste aldık */
  setText(state.translatedText);

  /* üst inputtaki veriyi alttaki yani store a aktardık. */
  dispatch(setTranslated(text));

}


  return (
    <div id='main-page'>

      <div className="container">
        <h1>ÇEVİRİ +</h1>
        {/* ÜST KISIM */}
        <div className='upper'>
          <Select 
          onChange={setSourceLang} 
          isLoading={state.isLoading}
          isDisabled={state.isLoading}
          className="select" 
          options={refined}
          value={sourceLang}
          />
          
          <button onClick={handleSwap}> Change </button>
          <Select 
          onChange={setTargetLang} 
          className="select" 
          options={refined}
          isLoading={state.isLoading}
          isDisabled={state.isLoading}
          value={targetLang}
          />
        </div>
        {/* ORTA KISIM */}
        <div className='middle'>
          <div>
          <textarea 
          value={text} 
          onChange={(e) =>setText(e.target.value)}
          />
          </div>
          <div>

          {state.isTranslateLoading  && 
          <div class="pyramid-loader">
          <div class="wrapper">
            <span class="side side1"></span>
            <span class="side side2"></span>
            <span class="side side3"></span>
            <span class="side side4"></span>
            <span class="shadow"></span>
          </div>  
        </div>}

          <textarea value={state.translatedText} disabled
          />
          </div>
          
        </div>
        {/* ALT KISIM */}
        <button onClick={() => dispatch(translateText({sourceLang,targetLang,text}))}>Çevir</button>
      </div>

    </div>
  )
}

export default App