const { v1: uuidv1, v4: uuidv4 } = require('uuid')

const process = require('process')

function Error(message)
{

    console.log("Error: " + message)

    process.exit(1)

}

let numOut = 1

//let idVer = "v4"

let uuidFunc = uuidv4

process.argv.forEach((val, index) => {

    switch(index)
    {

        case 2:

            const parsedVal = parseInt(val, 10)

            if(!isNaN(parsedVal))
            {

                if(parsedVal < 1)
                {

                    Error("Arg 1 is invalid: must be greater than 0")

                }
                
                numOut = parsedVal

            }
            else
            {

                Error("Arg 1 is invalid: " + val)

            }

            break
        case 3:

            //let vRegex = '/(v|V)[1-4]/'

            let vStrLowered = ""

            //v12 deosn't seem to support regex.test(...)

            //if(vRegex.test(val))
            //if(val.match(vRegex) != null)

            //Cannot get regexs to work properly in v12

            vStrLowered = val.toLowerCase()

            if(vStrLowered == "v1" || vStrLowered == "v3" || vStrLowered == "v4" || vStrLowered == "v5")
            {

                idVer = vStrLowered

            }
            else
            {

                Error("Arg 2 is invalid: " + val + " must be either v1, v3, v4 or v5")

            }

            //else
            //{
                
              //  Error("Arg 2 invalid: " + val + " must conform to: " + vRegex.toString())

            //}

            switch(vStrLowered)
            {

                //is v4 by default

                case "v1":

                    uuidFunc = uuidv1

                    break
                case "v3":

                    Error("Not supported")

                    break
                case "v4":

                    //already outputting v4

                    break
                case "v5":

                    Error("Not supported")

                    break
                default:

                    Error("Arg 2 is invalid: " + val)

                    break
            }

            break
        case 4:

            Error("Too many arguments provided")

            break
    }

})

while(numOut > 0)
{
    
    console.log(uuidFunc())

    numOut--

}