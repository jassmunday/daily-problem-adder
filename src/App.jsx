import { useState ,useEffect} from 'react'
import { ProblemProvider } from './context/ProblemContext'
import './App.css'
import ProblemForm from './components/ProblemForm';
import ProblemItem from './components/ProblemItem';

function App() {
  const [problems, setProblems] = useState([]);// it is an array where all problems will be stored

  const addProblem=(problem)=>{
      setProblems((prevProblem) => [{ id:Date.now(),...problem}, ...prevProblem] )
  }


  const updateProblem =(problem,id) =>{
    setProblems((prevProblem) => prevProblem.map((val) => (val.id === id ? problem : val)))
  }
  const deleteProblem=(id)=>{
    setProblems((prevProblem) => prevProblem.filter((problem) => problem.id !== id ))
  }
  const solvedProblem=(id)=>{
     setProblems((prevProblem) => 
     prevProblem.map((val) => val.id ===id ? {...val, solved: !val.solved}: val) )
  }

  // now useeffect will be used here to get all the problems from the local storage when it is loaded on the browser
  // localStorage.getItem() and .setitem() is used to store the data in the localstorage
  useEffect(() => {
     const problems = JSON.parse(localStorage.getItem("problems"))// getting value from the localStorage

     if(problems && problems.length >0){
         setProblems(problems);
     }
  }, [])

  useEffect(() => {
    // localStorage.setItem("problems","value for the problem") // --> value should be in string form 
                                                                //     but in our case it is in array form
    localStorage.setItem("problems",JSON.stringify(problems))
  }, [problems])
  
  

  return (
    <ProblemProvider value ={{problems,addProblem,updateProblem,deleteProblem,solvedProblem}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Daily Problem Solver</h1>
                    <div className="mb-4">
                        <ProblemForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {problems.map((problem) => (
                          
                            <div key={problem.id}
                            className='w-full'>
                              <ProblemItem problem={problem}/>
                            </div>
                          
                        ))}
                    </div>
                </div>
            </div>
    </ProblemProvider>
  )
}

export default App
