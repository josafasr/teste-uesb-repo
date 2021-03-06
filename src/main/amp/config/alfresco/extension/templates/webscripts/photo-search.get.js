const DEFAULT_MAX_RESULTS = 500;
const SITES_SPACE_QNAME_PATH = "/app:company_home/st:sites/";

function doSearch(siteId, maxResults)
{
    var alfQuery =
        'ASPECT:"exif:exif"' +
        ' AND PATH:"' + SITES_SPACE_QNAME_PATH + '/cm:' + siteId +
        '/cm:documentLibrary//*"'; +
        ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}thumbnail"' +
        ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}folder"';

    var queryDef = {
        query: alfQuery,
        language: "fts-alfresco",
        page: {maxItems: maxResults},
        templates: []
    };

    return search.query(queryDef);
}

function main()
{
    var siteId = url.templateArgs.site;
    var maxResults = (args.maxResults !== null) ? parseInt(args.maxResults) : DEFAULT_MAX_RESULTS; 

    var nodes = doSearch(siteId, maxResults);

    model.nodes = nodes;
    model.site = siteId;
}

main();

// Pesquisas:
// ASPECT:"exif:exif" AND PATH:"/app:company_home/st:sites/cm:sif/cm:documentLibrary//*" AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}thumbnail" AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}folder"
// PATH:"/app:company_home/st:sites/cm:sif/cm:documentLibrary//*" AND TYPE:"sif:prontuario" AND (@sif\:prontuario_matricula:'720000002')
// PATH:"/app:company_home/st:sites/cm:sif/cm:documentLibrary//*" AND PARENT:"workspace://SpacesStore/dead763e-4a8f-434b-990a-44eb1d27fbd1"
