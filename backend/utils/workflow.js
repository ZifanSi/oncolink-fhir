function getNextOncologyTask(current) {
  const chain = ['Biopsy', 'Diagnosis', 'Referral', 'TreatmentStart'];
  const index = chain.indexOf(current);
  return index >= 0 && index < chain.length - 1 ? chain[index + 1] : null;
}
module.exports = { getNextOncologyTask };