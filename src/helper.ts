export const replaceBrMonth = (date: string) => {
  if (date.indexOf('FEV') > -1) return date.replace('FEV', 'FEB')
  if (date.indexOf('ABR') > -1) return date.replace('ABR', 'APR')
  if (date.indexOf('MAIO') > -1) return date.replace('MAIO', 'MAY')
  if (date.indexOf('AGO') > -1) return date.replace('AGO', 'AUG')
  if (date.indexOf('SET') > -1) return date.replace('SET', 'SEP')
  if (date.indexOf('OUT') > -1) return date.replace('OUT', 'OCT')
  if (date.indexOf('DEZ') > -1) return date.replace('DEZ', 'DEC')
}
