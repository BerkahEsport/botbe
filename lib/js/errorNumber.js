/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default async function errorNumber(text) {
    const number = parseInt(text)
    const statusCodes = {
        100: "Continue. The server has received the request and is waiting for the user to continue.",
        101: "Switching Protocols. The server understands the request but wants the user to switch to a different protocol.",
        102: "Processing. The server is processing the request but has not yet completed it. Please wait.",
        103: "Early Hints. The server is providing information about the upcoming main response.",
        200: "OK. The request was successful and the response contains the requested information.",
        201: "Created. The request was successful and a new resource has been created as a result.",
        202: "Accepted. The request has been accepted for processing, but the processing has not been completed yet.",
        203: "Non-Authoritative Information. The response is the result of a cache or other source.",
        204: "No Content. The request was successful but there is no content to send back.",
        205: "Reset Content. The request was successful, and the user should reset the view.",
        206: "Partial Content. The response contains only part of the result due to a range request.",
        207: "Multi-Status. The response contains multiple different HTTP status codes.",
        208: "Already Reported. The request has been accepted and will be processed over time.",
        226: "IM Used. The request was successful and the response is a representation of the result that has been modified.",
        300: "Multiple Choices. There are multiple possible results that the user can choose from.",
        301: "Moved Permanently. The requested resource has permanently moved to a new location.",
        302: "Found. The requested resource has temporarily moved to a new location.",
        303: "See Other. The response contains a link to another location that the user should follow.",
        304: "Not Modified. The resource has not changed since it was last accessed.",
        305: "Use Proxy. The user must use the proxy provided in the response.",
        306: "Unused. This status code was previously used but is no longer in use.",
        307: "Temporary Redirect. The requested resource has temporarily moved to a new location.",
        308: "Permanent Redirect. The requested resource has permanently moved to a new location.",
        400: "Bad Request. The request is invalid. Please check the data you have sent.",
        401: "Unauthorized. Authorization failed. Ensure you have the correct permissions.",
        402: "Payment Required. Payment is required. This result requires payment.",
        403: "Forbidden. Access denied. You do not have permission to access this resource.",
        404: "Not Found. The resource could not be found on the server.",
        405: "Method Not Allowed. The method is not allowed for this resource.",
        406: "Not Acceptable. The server cannot produce a response that is acceptable to the user.",
        407: "Proxy Authentication Required. The proxy requires authentication.",
        408: "Request Timeout. The server did not respond within the allotted time.",
        409: "Conflict. The request conflicts with the current state of the resource.",
        410: "Gone. The resource is no longer available. The requested resource is no longer available.",
        411: "Length Required. The request is missing the Content-Length header.",
        412: "Precondition Failed. A precondition in the request was not met.",
        413: "Payload Too Large. The request payload is too large to be processed by the server.",
        414: "URI Too Long. The request URI is too long for the server to process.",
        415: "Unsupported Media Type. The media type in the request is not supported by the server.",
        416: "Range Not Satisfiable. The range requested cannot be satisfied by the server.",
        417: "Expectation Failed. The server cannot meet the expectation specified in the Expect header.",
        418: "I'm a teapot. (This is an April Fools' joke and is not used seriously).",
        421: "Misdirected Request. The request was directed to a server that cannot respond.",
        422: "Unprocessable Entity. The entity in the request cannot be processed by the server.",
        423: "Locked. The resource is locked and cannot be accessed at the moment.",
        424: "Failed Dependency. A dependency in the request failed.",
        425: "Too Early. The request was received before the allowed time.",
        426: "Upgrade Required. The user needs to upgrade the protocol version being used.",
        428: "Precondition Required. The server requires a condition to be met in the request.",
        429: "Too Many Requests. Too many requests from the user, usage limit reached.",
        431: "Request Header Fields Too Large. The request headers are too large to be processed by the server.",
        451: "Unavailable For Legal Reasons. The resource is unavailable due to legal reasons.",
        500: "Internal Server Error. An internal server error occurred. We are working on fixing it.",
        501: "Not Implemented. The request method is not implemented by the server.",
        502: "Bad Gateway. The server, acting as a gateway or proxy, received an invalid response.",
        503: "Service Unavailable. The service is unavailable due to high load or maintenance.",
        504: "Gateway Timeout. The server, acting as a gateway or proxy, did not receive a timely response.",
        505: "HTTP Version Not Supported. The HTTP version in the request is not supported by the server.",
        506: "Variant Also Negotiates. The server has fulfilled a precondition in the request.",
        507: "Insufficient Storage. The server does not have enough space to store the response.",
        508: "Loop Detected. The server detected an infinite loop in the request.",
        510: "Not Extended. The request requires an extension that is not supported by the server.",
        511: "Network Authentication Required. The user must authenticate to gain network access."
    };
    if (statusCodes[number]) {
        return statusCodes[number];
    } else {
        return false;
    }
}