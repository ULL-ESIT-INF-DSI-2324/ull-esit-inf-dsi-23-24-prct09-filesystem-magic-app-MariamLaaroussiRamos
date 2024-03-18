/**
 * Clase abstracta que define el esqueleto de Filter, Map y Reduce.
 */
export abstract class FilterMapReduce {
    /**
     * Método principal que ejecuta el algoritmo en pasos.
     * @param data - La lista de números de entrada.
     * @param predicate - El predicado lógico para el filtro.
     * @returns El resultado de la operación de reducción.
     */
    public executePipeline(data: number[], predicate: (num: number) => boolean): number {
      const filteredData = this.filterData(data, predicate);
      const mappedData = this.mapData(filteredData, this.mapFunction);
      return this.reduceData(mappedData, this.reduceFunction);
    }
  
    /**
     * Método de filtro.
     * @param data - La lista de números a filtrar.
     * @param predicate - El predicado lógico para filtrar los números.
     * @returns La lista filtrada según el predicado.
     */
    public filterData(data: number[], predicate: (num: number) => boolean): number[] {
      const filtered: number[] = [];
      for (const num of data) {
        if (predicate(num)) {
          filtered.push(num);
        }
      }
      return filtered;
    }
  
    /**
     * Método de mapeo.
     * @param data - La lista de números a mapear.
     * @param mapper - La función de mapeo a aplicar a cada número.
     * @returns La lista resultante después de aplicar la función de mapeo.
     */
    public mapData(data: number[], mapper: (num: number) => number): number[] {
      const mapped: number[] = [];
      for (const num of data) {
        mapped.push(mapper(num));
      }
      return mapped;
    }
  
    /**
     * Método de reducción.
     * @param data - La lista de números a reducir.
     * @param reducer - La función de reducción para combinar los números.
     * @returns El resultado de la operación de reducción.
     */
    public abstract reduceData(data: number[], reducer: (acc: number, curr: number) => number): number;
  
    /**
     * Predicado por defecto para el filtro (números positivos).
     * @param num - El número a evaluar en el filtro.
     * @returns Verdadero si el número es positivo, falso en caso contrario.
     */
    public defaultPredicate(num: number): boolean {
      return num >= 0;
    }
  
    /**
     * Función de mapeo por defecto (multiplicar por 2).
     * @param num - El número a mapear.
     * @returns El resultado de multiplicar el número por 2.
     */
    public mapFunction(num: number): number {
      return num * 2;
    }
  
    /**
     * Función de reducción por defecto (suma).
     * @param acc - El acumulador de la reducción.
     * @param curr - El número actual a reducir.
     * @returns El resultado de sumar el acumulador y el número actual.
     */
    public reduceFunction(acc: number, curr: number): number {
      return acc + curr;
    }
  }

  /**
   * Implementación concreta para realizar una suma tras filtros y mapeos.
   */
  export class FilterMapAddReduce extends FilterMapReduce {
    /**
     * Reducción personalizada (suma).
     */
    public reduceData(data: number[], reducer: (acc: number, curr: number) => number): number {
      return data.reduce(reducer, 0);
    }
  }
  
  /**
   * Implementación concreta para realizar una resta tras filtros y mapeos.
   */
  export class FilterMapSubReduce extends FilterMapReduce {
    /**
     * Reducción personalizada (resta).
     */
    public reduceData(data: number[], reducer: (acc: number, curr: number) => number): number {
      let acc = 0;
      for (const num of data) {
        acc = reducer(acc, num);
      }
      return acc;
    }
  }
  
  
  const numbers = [1, -2, 3, -4, 5];
  const filterMapAddReduce = new FilterMapAddReduce();
  const sumResult = filterMapAddReduce.executePipeline(numbers, filterMapAddReduce.defaultPredicate);
  console.log('suma:', sumResult); 
  
  const filterMapSubReduce = new FilterMapSubReduce();
  const subResult = filterMapSubReduce.executePipeline(numbers, filterMapSubReduce.defaultPredicate);
  console.log('resta:', subResult);
  