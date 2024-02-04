import  React, { createContext, useContext } from 'react'

// create context
export const ProblemContext = createContext({
    // the problems is an array of objects in which the problems will be stored

    problems:[
        {
            id:1,
            problem:"Reverse an Array",
            solved: false
        }  
    ],

    addProblem: (id)=>{},
    updateProblem: (id,problem)=>{},
    deleteProblem: (id)=>{},
    solvedProblem: (id)=>{},
});

// create custom hook to use the context

export const useProblem = ()=>{
    return useContext(ProblemContext);
}

// create context provider
export const ProblemProvider = ProblemContext.Provider;
