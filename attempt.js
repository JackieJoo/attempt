// Intersection of two arrays
function reduceToOne(available, allowed) {
  return available.filter(el => allowed.includes(el));
}

/**
 * Function attempt
 * 
 * All params are in ascending order.
 * @param {array} available = what do you have.
 * @param {array} allowed = what can you use.
 * @param {array} preferred = what do you want.
 * returns: 
 *    {array} of entities which are within {available} AND {allowed} WITH RESPECT TO {preffered}
 * 
 * Assuming: 
 * - Resulting Array can be in descending order
 * - 'any' can possibly be in both allowed and preffered
 * 
 */

function attempt(available, allowed, preferred) {
  let availableAndAllowed = [];
  let differenceAA = [];
  let differenceP = [];
  let result = [];

  if (available.length === 0 || allowed.length === 0) {
    return [];
  }

  // Handle 'any' case
  if (allowed.includes('any')) {
    availableAndAllowed = [...available]
    if (preferred.includes('any')) {
      return availableAndAllowed;
    }
  } else if (preferred.includes('any')) {
    return reduceToOne(available, allowed);
  } else {
    availableAndAllowed = reduceToOne(available, allowed);
  }

  // Calculating difference of the arrays
  differenceAA = availableAndAllowed.filter(el => !preferred.includes(el));
  differenceP = preferred.filter(el => !availableAndAllowed.includes(el));
  // Intersection of availableAndAllowed and preferred
  result = reduceToOne(availableAndAllowed, preferred);

  for (let i = 0; i < differenceP.length; i++) {
    if (differenceAA.length > 0) {
      // Elements from diffAA which are greater than current element in diffP
      let greater = differenceAA.filter(el => el > differenceP[i]);
      let res = 0;
      if (greater.length > 0) {
        // Minimum greater value than the current element
        res = Math.min(...greater);
        // Delete added element
        differenceAA = differenceAA.filter(el => el !== res)
      } else {
        // If greater is empty it means that all values are lesser than the current 
        //   find max of them
        res = Math.max(...differenceAA);
        differenceAA = differenceAA.filter(el => el !== res)
      }

      result.push(res);
    }
  }

  // Can look at transitional values in the arrays
  // console.log(`availableAndAllowed: ${availableAndAllowed} \n differenceAA: ${differenceAA} \n differenceP: ${differenceP}\n result: ${result}`)

  // if order should be always ascending
  // return result.sort((a, b) => a - b);

  return result;
}