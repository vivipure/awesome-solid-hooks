/**
 * provide methods for parent component
 * @param ref {Object}
 * @param createHandle 
 * 
 * @example
 * useImperativeHandle(props.ref, () => ({
 *     focus() {
 *          //
 *     },
 *     ....
 * }))
 * 
 * */
export function useImperativeHandle(
  ref: Record<string, any>,
  createHandle: () => Record<string, any>
) {
  Object.assign(ref, createHandle());
}
