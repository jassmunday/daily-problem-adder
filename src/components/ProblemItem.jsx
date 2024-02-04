import React, { useState } from 'react'
import { useProblem } from '../context/ProblemContext';

function ProblemItem({ problem }) { // we are taking argument named problem which is giving us the value 
                                    // defined py problem context
    const [isProblemEditable,setIsProblemEditable] = useState(false);
    
    // problem argument object which is refering to the problem key defined in the the problem context
    const [problemStatement,setProblemStatement]= useState(problem.problem)

    const {updateProblem,deleteProblem,solvedProblem} = useProblem();
    
    // * To edit the problem using updateProblem from problemContext on the click of button
    const editProblem =() => {
         updateProblem(problem.id,{...problem,problem:problemStatement})
         setIsProblemEditable(false);
    }

    // * Now Writing the Local Method to trigger the solvedProblemm Toggle defined using problemContext
    const problemSolved= () => {
        solvedProblem(problem.id)
    }


    

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                problem.solved ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={problem.solved}
                onChange={problemSolved}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isProblemEditable ? "border-black/10 px-2" : "border-transparent"
                } ${problem.solved ? "line-through" : ""}`}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                readOnly={!isProblemEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (problem.solved) return;

                    if (isProblemEditable) {
                        editProblem();
                    } else setIsProblemEditable((prev) => !prev);
                }}
                disabled={problem.solved}
            >
                {isProblemEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Problem Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteProblem(problem.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default ProblemItem;
