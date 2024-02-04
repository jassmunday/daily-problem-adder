import React, { useState } from 'react'
import { useProblem } from '../context/ProblemContext';

function ProblemForm() {
    const [problem,setProblem] = useState(""); // To set the value of Individual Problem

    const {addProblem} = useProblem();

    // To save or add the data defined using the problem context on click of add button or submission of form
    const add = (event) => {
       event.preventDefault();
       if(!problem) return
       
       // addProblem({id: Date.now(), problem:problem,solved:false}); --> This is actually we have to pass
       addProblem({ problem:problem,solved:false});  // As id is already given no need to pass again
       // After setting or Passing the data to the Context , set the setProblem value to null again to take more input from the user
       setProblem("");
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Problem..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={problem}
                onChange={(e)=> {setProblem(e.target.value)}}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default ProblemForm;

