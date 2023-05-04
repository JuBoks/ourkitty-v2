import os
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet import MobileNet, preprocess_input
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
import matplotlib.pyplot as plt
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from glob import glob
from sklearn.model_selection import train_test_split
import yaml
from IPython.display import Image
import dlib, cv2
import pandas as pd
import random
import keras, datetime
from keras.layers import Input, Dense 
from keras.models import Model
from keras.callbacks import TensorBoard, ModelCheckpoint, ReduceLROnPlateau
from keras.applications.mobilenet_v2 import MobileNetV2
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn import svm
from sklearn.metrics import accuracy_score
from collections import Counter

# git clone https://github.com/ultralytics/yolov5


img_size = 224
base_path = './drive/MyDrive/Dataset/Dataset_for_Image_Clustering/230426_Face_Only' 



def resize_img(im):
  old_size = im.shape[:2] # old_size is in (height, width) format
  ratio = float(img_size) / max(old_size)
  new_size = tuple([int(x*ratio) for x in old_size])
  im = cv2.resize(im, (new_size[1], new_size[0]))
  delta_w = img_size - new_size[1]
  delta_h = img_size - new_size[0]
  top, bottom = delta_h // 2, delta_h - (delta_h // 2)
  left, right = delta_w // 2, delta_w - (delta_w // 2)
  new_im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0])
  return new_im, ratio, top, left


def extract_features(directory):
    # Load the MobileNet model
    model = MobileNet(weights='imagenet', include_top=False)

    features = []
    for img_name in os.listdir(directory):
        # Load the image and preprocess it
        img_path = os.path.join(directory, img_name)
        img = cv2.imread(img_path)
        img, ratio, top, left = resize_img(img)        
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        # Extract features using the MobileNet model
        features.append(model.predict(x).ravel())

    return np.array(features)

def cluster_images(directory):
    # Extract features from the images
    features = extract_features(directory)

    # Determine the optimal number of clusters using the elbow method
    wcss = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
        kmeans.fit(features)
        wcss.append(kmeans.inertia_)
    plt.plot(range(1, 11), wcss)
    plt.title('Elbow Method')
    plt.xlabel('Number of clusters')
    plt.ylabel('WCSS')
    plt.show()

    # Ask the user for the optimal number of clusters based on the elbow point in the plot
    while True:
        try:
            num_clusters = int(input("Enter the optimal number of clusters: "))
            break
        except ValueError:
            print("Invalid input. Please enter an integer.")

    # Perform K-means clustering on the features
    kmeans = KMeans(n_clusters=num_clusters, random_state=42).fit(features)

    # Reduce the dimensionality of the features to 2 dimensions using PCA
    pca = PCA(n_components=2)
    pca_features = pca.fit_transform(features)

    # Plot the clusters using a scatter plot with annotated data points
    fig, ax = plt.subplots()
    scatter = ax.scatter(pca_features[:, 0], pca_features[:, 1], c=kmeans.labels_, cmap='rainbow')
    ax.set_xlabel('Principal Component 1')
    ax.set_ylabel('Principal Component 2')

    # Annotate each data point with its corresponding image name
    image_paths = [os.path.join(directory, img_name) for img_name in os.listdir(directory)]
    for i, img_path in enumerate(image_paths):
        img_name = os.path.basename(img_path)
        ax.annotate(img_name, (pca_features[i, 0], pca_features[i, 1]))

    plt.show()

    return num_clusters, kmeans.labels_

cluster_images(base_path)