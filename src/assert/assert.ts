import { JSONValue } from '../internal'
import {
    type LocationInfo,
    offsetAPICaller,
    newLocationInfo,
    columnUnknown,
} from './location'
import { get_tracker_entry, emit_assertion } from './tracker'
import { type AssertType, AssertInfo } from './tracker'

const was_hit = true
const must_be_hit = true
// const optionally_hit = false
const expecting_true = true

const universal_test = 'every'
// const existential_test = 'some'
// const reachability_test = 'none'

/** Assert that condition is true one or more times during a test. Callers of
 * `Always` can see failures in two cases:
 * 1. If this function is ever invoked with a `false` for the conditional or
 * 2. If an "indexed" invocation of Always is not covered at least once.
 *
 * @param message will be used as a display name in reporting and should therefore be
 * useful to a broad audience.
 *
 * @param values is used to supply context useful
 * for understanding the reason that condition had the value it did. For instance,
 * in an asertion that x > 5, it could be helpful to send the value of x so failing
 * cases can be better understood.
 */
export const Always = (
    message: string,
    condition: boolean,
    values: JSONValue
) => {
    const location_info = newLocationInfo(offsetAPICaller)
    assertImpl(
        message,
        condition,
        values,
        location_info,
        was_hit,
        must_be_hit,
        expecting_true,
        universal_test
    )
}

/** Unwrapped raw assertion access for custom tooling. Not to be called directly.
 */
export const AssertRaw = (
    message: string,
    cond: boolean,
    values: JSONValue,
    classname: string,
    funcname: string,
    filename: string,
    line: number,
    hit: boolean,
    must_hit: boolean,
    expecting: boolean,
    assert_type: AssertType
) => {
    const loc_info = {
        classname,
        ['function']: funcname,
        filename,
        line,
        column: columnUnknown,
    }
    assertImpl(
        message,
        cond,
        values,
        loc_info,
        hit,
        must_hit,
        expecting,
        assert_type
    )
}

const assertImpl = (
    message: string,
    cond: boolean,
    values: JSONValue,
    loc: LocationInfo,
    hit: boolean,
    must_hit: boolean,
    expecting: boolean,
    assert_type: AssertType
) => {
    const message_key = makeKey(loc)
    const tracker_entry = get_tracker_entry(message_key)

    if (tracker_entry) {
        const aI: AssertInfo = {
            hit,
            must_hit,
            assert_type,
            expecting,
            category: '',
            message,
            condition: cond,
            id: message_key,
            location: loc,
            details: values,
        }

        emit_assertion(tracker_entry, aI)
    }
}

const makeKey = (loc: LocationInfo) => {
    return `${loc.filename}|${loc.line}|${loc.column}`
}
