export function location (props, route) {
  return props.location && props.location.pathname && props.location.pathname.indexOf(route) >= 0
}
