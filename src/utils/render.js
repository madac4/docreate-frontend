import Document from '../components/buttons/Document';

export const renderDocumentItem = (docs) => (
    <div className="documents-list pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 md:mt-12">
        {docs.map((doc) => (
            <Document key={`${doc.name}_${doc._id}`} doc={doc} />
        ))}
    </div>
);
