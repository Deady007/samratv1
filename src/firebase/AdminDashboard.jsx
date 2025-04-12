import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';
import { app } from './firebase';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [newBackgroundImage, setNewBackgroundImage] = useState(null);
    const [orders, setOrders] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', image: null });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            setLoading(true);
            if (authUser) {
                if (authUser.email === 'meetkhaire037@gmail.com') {
                    setUser(authUser);
                    await Promise.all([
                        fetchBackgroundImage(),
                        fetchOrders(),
                        fetchMenuItems(),
                    ]);
                } else {
                    setError('Unauthorized Access');
                    await auth.signOut();
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchBackgroundImage = async () => {
        try {
            const storageRef = ref(storage, 'homepage/background.jpg');
            const url = await getDownloadURL(storageRef);
            setBackgroundImage(url);
        } catch (err) {
            console.error('Error fetching background image:', err);
            setError('Error fetching background image.');
        }
    };

    const fetchOrders = () => {
        const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
            const fetchedOrders = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(fetchedOrders);
        });
        return () => unsubscribe();
    };

    const fetchMenuItems = () => {
        const unsubscribe = onSnapshot(collection(db, 'menu'), (snapshot) => {
            const fetchedItems = snapshot.docs.map((doc) => {
                const { image, ...data } = doc.data(); // Destructure to exclude 'image'
                return {
                    id: doc.id,
                    ...data,
                };
            });
            setMenuItems(fetchedItems);
        });
        return () => unsubscribe();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (email !== 'meetkhaire037@gmail.com') {
                setError('Unauthorized Access');
                await auth.signOut();
            }
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleImageUpload = async () => {
        if (!newBackgroundImage) return;
        setLoading(true);
        try {
            const storageRef = ref(
                storage,
                `homepage/${new Date().getTime()}-${newBackgroundImage.name}`
            );
            await uploadBytes(storageRef, newBackgroundImage);
            const downloadURL = await getDownloadURL(storageRef);

            await updateDoc(doc(db, 'settings', 'homepage'), {
                backgroundImage: downloadURL,
            });
            setBackgroundImage(downloadURL);
            setNewBackgroundImage(null);
            setSuccessMessage('Background image updated successfully!');
        } catch (dbError) {
            console.error('Error updating background image URL:', dbError);
            setError('Error updating background image.');
        }
        setLoading(false);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
            setSuccessMessage('Order status updated.');
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Error updating order status.');
        }
        setLoading(false);
    };

    const addItemToMenu = async () => {
        setLoading(true);
        try {
            let imageUrl = '';
            if (newItem.image) {
                const storageRef = ref(storage, `menu/${newItem.image.name}`);
                await uploadBytes(storageRef, newItem.image);
                imageUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, 'menu'), {
                name: newItem.name,
                price: newItem.price,
                image: imageUrl,
            });

            setNewItem({ name: '', price: '', image: null });
            setSuccessMessage('Item added to menu.');
        } catch (error) {
            console.error('Error adding item:', error);
            setError('Error adding item.');
        }
        setLoading(false);
    };

    const deleteMenuItem = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this item?'
        );
        if (!confirmDelete) return;

        setLoading(true);
        try {
            await deleteDoc(doc(db, 'menu', id));
            setSuccessMessage('Item deleted.');
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Error deleting item.');
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Error logging out.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'red';
            case 'Preparing':
                return 'yellow';
            case 'Out for Delivery':
                return 'blue';
            case 'Order Completed':
                return 'green';
            default:
                return 'black'; // Default color
        }
    };

    if (!user) {
        return (
            <div className="admin-container">
                <h2 className="admin-heading">Admin Login</h2>
                {error && <p className="admin-error">{error}</p>}
                <form onSubmit={handleLogin} className="admin-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="admin-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="admin-input"
                    />
                    <button type="submit" className="admin-button">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <h2 className="admin-heading">Admin Dashboard</h2>

            {loading && <div className="loading-indicator">Loading...</div>}
            {error && <p className="admin-error">{error}</p>}
            {successMessage && <p className="admin-success">{successMessage}</p>}

            <button onClick={handleLogout} className="admin-button">
                Logout
            </button>

            <div className="admin-section">
                <h3 className="admin-section-title">Change Homepage Background</h3>
                {backgroundImage && <img src={backgroundImage} alt="Background" className="admin-background-image" />}
                <input type="file" onChange={(e) => setNewBackgroundImage(e.target.files[0])} className="admin-input" />
                <button onClick={handleImageUpload} className="admin-button">Upload and Change</button>
            </div>

            <div className="admin-section">
                <h3 className="admin-section-title">Order Management</h3>
                {orders.map((order) => (
                    <div key={order.id} className="admin-order">
                        <p>Order ID: <span className="admin-order-id">{order.id}</span></p>
                        <p>
                            Status:
                            <span
                                className="admin-order-status"
                                style={{ backgroundColor: getStatusColor(order.status), color: 'white', padding: '5px', borderRadius: '5px' }}
                            >
                                {order.status}
                            </span>
                        </p>
                        <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="admin-select"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Order Completed">Order Completed</option>
                        </select>
                    </div>
                ))}
            </div>

            <div className="admin-section">
                <h3 className="admin-section-title">Menu Management</h3>
                <input
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="admin-input"
                />
                <input
                    placeholder="Price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="admin-input"
                />
                <input
                    type="file"
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
                    className="admin-input"
                />
                <button onClick={addItemToMenu} className="admin-button">Add Item</button>

                {menuItems.map((item) => (
                    <div key={item.id} className="admin-menu-item">
                        <p>{item.name} - ₹{item.price}</p>
                        <button onClick={() => deleteMenuItem(item.id)} className="admin-delete-button">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;