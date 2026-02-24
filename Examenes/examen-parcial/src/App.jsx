import React, { useState, useEffect } from 'react';
import { Rocket, AlertCircle, Loader2, Save, Terminal, Image as ImageIcon, Info, Globe, Stars, Camera } from 'lucide-react';

const NASA_API = {
    DEFAULT_KEY: import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY',

    async getAPOD(count = 12, customKey = null) {
        const key = customKey || this.DEFAULT_KEY;
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&count=${count}`);
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            return {
                items: data.filter(item => item.media_type === 'image').map(item => ({
                    id: item.date,
                    img_src: item.url,
                    hd_src: item.hdurl || item.url,
                    title: item.title,
                    explanation: item.explanation,
                    date: item.date,
                    copyright: item.copyright,
                    media_type: item.media_type,
                    type: 'apod'
                })),
                usedKey: key,
                isMock: false
            };
        } catch (err) {
            return { items: this.getMockAPOD(), usedKey: "FALLO", isMock: true };
        }
    },

    async getMars(rover = 'curiosity', sol = 1000, customKey = null) {
        const key = customKey || this.DEFAULT_KEY;
        try {
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&api_key=${key}`);
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            if (!data.photos || data.photos.length === 0) {
                return { items: this.getMockMars(), usedKey: "NO_PHOTOS", isMock: true };
            }
            return {
                items: data.photos.slice(0, 12).map(p => ({
                    id: p.id,
                    img_src: p.img_src.replace(/^http:/, 'https:'),
                    camera: p.camera,
                    sol: p.sol,
                    earth_date: p.earth_date,
                    rover: p.rover,
                    type: 'mars'
                })),
                usedKey: key,
                isMock: false
            };
        } catch (err) {
            return { items: this.getMockMars(), usedKey: "FALLO", isMock: true };
        }
    },

    async getEPIC(customKey = null) {
        const key = customKey || this.DEFAULT_KEY;
        try {
            const response = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${key}`);
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            const latest = data.slice(0, 12);
            return {
                items: latest.map(item => {
                    const date = new Date(item.date);
                    const year = item.date.split('-')[0];
                    const month = item.date.split('-')[1];
                    const day = item.date.split('-')[2];
                    return {
                        id: item.image,
                        img_src: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`,
                        title: `EPIC - ${item.date}`,
                        date: item.date,
                        caption: item.caption,
                        type: 'epic'
                    };
                }),
                usedKey: key,
                isMock: false
            };
        } catch (err) {
            return { items: this.getMockEPIC(), usedKey: "FALLO", isMock: true };
        }
    },

    getMockAPOD() {
        return [
            { id: '1', img_src: 'https://apod.nasa.gov/apod/image/2401/OrionNEBula_ngc1977_960.jpg', title: 'Nebulosa de Orión', date: '2024-01-15', type: 'apod' },
            { id: '2', img_src: 'https://apod.nasa.gov/apod/image/2401/MercuryJames_960.jpg', title: 'Mercurio', date: '2024-01-14', type: 'apod' },
            { id: '3', img_src: 'https://apod.nasa.gov/apod/image/2401/HaChamaeleon_960.jpg', title: 'Cúmulo Chamaeleon', date: '2024-01-13', type: 'apod' },
            { id: '4', img_src: 'https://apod.nasa.gov/apod/image/2401/HoagsObject_960.jpg', title: 'Objeto de Hoag', date: '2024-01-12', type: 'apod' },
            { id: '5', img_src: 'https://apod.nasa.gov/apod/image/2401/JunoJupiter_960.jpg', title: 'Júpiter desde Juno', date: '2024-01-11', type: 'apod' },
            { id: '6', img_src: 'https://apod.nasa.gov/apod/image/2401/NGC4676_Hi_960.jpg', title: 'Ratones Galácticos', date: '2024-01-10', type: 'apod' }
        ];
    },

    getMockMars() {
        return [
            { id: 102693, sol: 1000, img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG", camera: { name: "FHAZ", full_name: "Front Hazard" }, earth_date: "2015-05-30", type: 'mars' },
            { id: 102694, sol: 1000, img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/rcam/RLB_486265255EDR_F0481570RHAZ00323M_.JPG", camera: { name: "RHAZ", full_name: "Rear Hazard" }, earth_date: "2015-05-30", type: 'mars' },
            { id: 102695, sol: 1000, img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/ncam/NLB_486265246EDR_F0481570NCAM00224M_.JPG", camera: { name: "NAVCAM", full_name: "Navigation" }, earth_date: "2015-05-30", type: 'mars' },
            { id: 102696, sol: 1000, img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/mcam/MLC_486265246EDR_F0481570MCAM00339M_.JPG", camera: { name: "MAST", full_name: "Mast Camera" }, earth_date: "2015-05-30", type: 'mars' }
        ];
    },

    getMockEPIC() {
        return [
            { id: 'epic_1', img_src: 'https://epic.gsfc.nasa.gov/archive/natural/2024/01/15/png/epic_1.png', title: 'Tierra desde EPIC', date: '2024-01-15', type: 'epic' },
            { id: 'epic_2', img_src: 'https://epic.gsfc.nasa.gov/archive/natural/2024/01/14/png/epic_1.png', title: 'Tierra desde EPIC', date: '2024-01-14', type: 'epic' }
        ];
    },

    async saveFavorite(item) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            success: true,
            message: "¡Guardado en favoritos intergalácticos!",
            timestamp: new Date().toISOString(),
            resource: item
        };
    }
};

const API_TYPES = [
    { id: 'apod', name: 'Astronomy Picture', icon: Stars, description: 'Imagen astronómica del día' },
    { id: 'mars', name: 'Mars Rover', icon: Rocket, description: 'Fotos del Curiosity en Marte' },
    { id: 'epic', name: 'Earth (EPIC)', icon: Globe, description: 'Imágenes de la Tierra desde el espacio' }
];

const Header = ({ activeApi, onApiChange }) => (
    <header className="py-6 px-4 border-b border-white/10 bg-black/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-mars-rust p-2 rounded-xl">
                        <Rocket className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-orbitron font-bold tracking-wider text-white">NASA GALLERY</h1>
                        <p className="text-xs text-mars-orange tracking-widest uppercase">Explorando el universo</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {API_TYPES.map(api => (
                    <button
                        key={api.id}
                        onClick={() => onApiChange(api.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeApi === api.id
                            ? 'bg-mars-rust text-white'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <api.icon size={16} />
                        <span>{api.name}</span>
                    </button>
                ))}
            </div>
        </div>
    </header>
);

const Modal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;
    const item = data.resource;
    const [activeTab, setActiveTab] = useState('info');

    const getRawTitle = () => {
        if (item.type === 'apod') return item.title;
        if (item.type === 'mars') return item.camera?.full_name || 'Mars Photo';
        if (item.type === 'epic') return item.title || 'Earth Image';
        return 'NASA Image';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-space-card border border-mars-rust/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="bg-mars-rust/10 p-4 border-b border-white/10 flex justify-between items-center text-mars-orange">
                    <div className="flex items-center gap-2">
                        <Save size={20} />
                        <span className="font-orbitron font-bold text-sm uppercase tracking-widest">Sincronización Completada</span>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-2xl leading-none">×</button>
                </div>

                <div className="flex border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'info' ? 'bg-mars-rust/20 text-white border-b-2 border-mars-rust' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Información
                    </button>
                    <button
                        onClick={() => setActiveTab('json')}
                        className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'json' ? 'bg-mars-rust/20 text-white border-b-2 border-mars-rust' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Respuesta Técnica
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {activeTab === 'info' ? (
                        <div className="space-y-6">
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-inner">
                                <img src={item.img_src} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="font-orbitron font-bold text-white text-lg">{getRawTitle()}</h3>
                                    <p className="text-mars-orange text-xs font-mono uppercase tracking-wider">{item.type} mission</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Identificador</p>
                                    <p className="font-mono text-sm text-white truncate">{item.id}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Fecha Registro</p>
                                    <p className="text-sm text-white">{item.date || item.earth_date}</p>
                                </div>
                                {item.camera && (
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 colspan-2">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Instrumento Óptico</p>
                                        <p className="text-sm text-white">{item.camera.full_name} ({item.camera.name})</p>
                                    </div>
                                )}
                                {item.rover && (
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Rover</p>
                                        <p className="text-sm text-white">{item.rover.name}</p>
                                    </div>
                                )}
                                {item.copyright && (
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Créditos</p>
                                        <p className="text-sm text-white truncate">{item.copyright}</p>
                                    </div>
                                )}
                            </div>

                            {item.explanation && (
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Descripción Científica</p>
                                    <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-3">{item.explanation}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-black/40 p-4 rounded-lg font-mono text-sm text-green-400 overflow-auto border border-white/5">
                            <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
                    <p className="text-[10px] text-green-500 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ESTADO: TRANSMISIÓN EXITOSA
                    </p>
                    <button onClick={onClose} className="mars-button text-sm px-8">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeKey, setActiveKey] = useState(localStorage.getItem('nasa_api_key') || '');
    const [showSettings, setShowSettings] = useState(false);
    const [isBackupData, setIsBackupData] = useState(false);
    const [activeApi, setActiveApi] = useState('apod');

    const fetchData = async (apiType = activeApi, keyToUse = activeKey) => {
        try {
            setLoading(true);
            setError(null);
            let result;
            switch (apiType) {
                case 'apod':
                    result = await NASA_API.getAPOD(12, keyToUse || null);
                    break;
                case 'mars':
                    result = await NASA_API.getMars('curiosity', 1000, keyToUse || null);
                    break;
                case 'epic':
                    result = await NASA_API.getEPIC(keyToUse || null);
                    break;
                default:
                    result = await NASA_API.getAPOD(12, keyToUse || null);
            }
            setItems(result.items);
            setIsBackupData(result.isMock);
            console.log(`API: ${apiType}, Key: ${result.usedKey}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeApi);
    }, [activeApi]);

    const handleSaveKey = (e) => {
        e.preventDefault();
        const newKey = e.target.elements.apiKey.value.trim();
        setActiveKey(newKey);
        localStorage.setItem('nasa_api_key', newKey);
        setShowSettings(false);
        fetchData(activeApi, newKey);
    };

    const handleSave = async (item) => {
        try {
            setIsSaving(true);
            const result = await NASA_API.saveFavorite(item);
            setModalData(result);
        } catch (err) {
            alert("Error al guardar");
        } finally {
            setIsSaving(false);
        }
    };

    const getTitle = (item) => {
        if (item.type === 'apod') return item.title;
        if (item.type === 'mars') return item.camera?.full_name || item.camera?.name || 'Mars Photo';
        if (item.type === 'epic') return item.title || 'Earth Image';
        return 'NASA Image';
    };

    const getSubtitle = (item) => {
        if (item.type === 'apod') return item.date;
        if (item.type === 'mars') return `Sol ${item.sol} • ${item.earth_date}`;
        if (item.type === 'epic') return item.date;
        return '';
    };

    return (
        <div className="min-h-screen">
            <Header activeApi={activeApi} onApiChange={setActiveApi} />

            <div className="max-w-7xl mx-auto px-4 mt-6 flex justify-between items-center">
                <div>
                    {isBackupData && (
                        <div className="flex items-center gap-2 bg-mars-orange/10 border border-mars-orange/30 px-3 py-1 rounded-full text-[10px] font-bold text-mars-orange animate-pulse">
                            <AlertCircle size={12} />
                            <span>MODO DE RESPALDO</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-xs flex items-center gap-2 text-slate-400 hover:text-mars-orange transition-colors"
                >
                    <Terminal size={14} />
                    <span>Configurar API Key</span>
                </button>
            </div>

            {showSettings && (
                <div className="max-w-7xl mx-auto px-4 mt-4">
                    <form onSubmit={handleSaveKey} className="bg-space-card p-6 rounded-2xl border border-mars-rust/20 flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full text-left">
                            <label className="block text-[10px] font-bold text-mars-orange uppercase tracking-widest mb-2">NASA API Key</label>
                            <input
                                name="apiKey"
                                defaultValue={activeKey}
                                placeholder="Ingresa tu API Key o deja vacío para DEMO_KEY"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mars-rust outline-none transition-colors"
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="mars-button text-sm whitespace-nowrap">Actualizar</button>
                    </form>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 animate-pulse">
                        <Loader2 className="text-mars-orange animate-spin mb-4" size={48} />
                        <p className="font-orbitron text-mars-orange tracking-widest uppercase text-sm">Cargando datos de NASA...</p>
                    </div>
                ) : error ? (
                    <div className="max-w-md mx-auto bg-red-950/20 border border-red-500/30 p-8 rounded-2xl text-center">
                        <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                        <h2 className="text-xl font-bold mb-2">Error de Conexión</h2>
                        <p className="text-slate-400 mb-6">{error}</p>
                        <button onClick={() => fetchData(activeApi)} className="mars-button bg-red-600 hover:bg-red-500">Reintentar</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="mars-card group">
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={item.img_src}
                                        alt={getTitle(item)}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=400&fit=crop";
                                        }}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <button
                                            onClick={() => handleSave(item)}
                                            disabled={isSaving}
                                            className={`mars-button flex items-center justify-center gap-2 w-full transition-all duration-300 ${isSaving ? 'scale-95 opacity-80' : 'hover:scale-105'}`}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={18} />
                                                    <span>Procesando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={18} />
                                                    <span>Guardar</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-bold tracking-widest text-mars-orange uppercase px-2 py-1 bg-mars-rust/10 border border-mars-rust/20 rounded">
                                            {item.type.toUpperCase()}
                                        </span>
                                        <span className="text-xs text-slate-500 font-mono">ID: {String(item.id).slice(0, 8)}</span>
                                    </div>
                                    <h3 className="font-orbitron font-bold text-sm text-white mb-2 truncate">
                                        {getTitle(item)}
                                    </h3>
                                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Info size={12} className="text-mars-rust" />
                                            <span>{getSubtitle(item)}</span>
                                        </div>
                                        {item.copyright && (
                                            <span className="truncate">© {item.copyright}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Modal
                isOpen={!!modalData}
                onClose={() => setModalData(null)}
                data={modalData}
            />

            <footer className="py-12 px-4 border-t border-white/5 bg-black/40 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs text-center md:text-left">
                        Datos proporcionados por NASA Open APIs<br />
                        Desarrollado para Examen Parcial de Programación Internet
                    </p>
                </div>
            </footer>
        </div>
    );
}
