# Stage 1: Install Android SDK
FROM ubuntu:latest as android-build
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-8-jdk \
    && rm -rf /var/lib/apt/lists/*

# Set up Android SDK
ARG ANDROID_SDK_ROOT=/usr/local/android-sdk
ENV ANDROID_SDK_ROOT ${ANDROID_SDK_ROOT}
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-7302050_latest.zip -O /tmp/android-sdk.zip \
    && mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools \
    && unzip -q /tmp/android-sdk.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools \
    && mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools/* ${ANDROID_SDK_ROOT}/cmdline-tools/ \
    && chmod +x ${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin/avdmanager \
    && rm /tmp/android-sdk.zip

# Set up PATH
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin:${ANDROID_SDK_ROOT}/platform-tools

# Accept licenses
RUN mkdir -p ${ANDROID_SDK_ROOT}/licenses/ \
    && echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55" > ${ANDROID_SDK_ROOT}/licenses/android-sdk-license \
    && echo -e "\n84831b9409646a918e30573bab4c9c91346d8abd" > ${ANDROID_SDK_ROOT}/licenses/android-sdk-preview-license \
    && echo -e "\nd56f5187479451eabf01fb78af6dfcb131a6481e" > ${ANDROID_SDK_ROOT}/licenses/intel-android-extra-license

# RUN    wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip && unzip commandlinetools-linux-6609375_latest.zip -d cmdline-tools   && mkdir --parents "$ANDROID_HOME/cmdline-tools/latest" && export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:ANDROID_HOME
RUN   yes | apt-get update && yes |  apt-get install android-tools-adb android-tools-fastboot && yes | apt-get install sdkmanager

# Install required Android SDK components
RUN yes | sdkmanager --licenses

# Install required Android SDK components
RUN sdkmanager "platform-tools" "platforms;android-30" "emulator"

# Stage 2: Create AVD
FROM ubuntu:latest
ARG ANDROID_SDK_ROOT=/usr/local/android-sdk
ENV ANDROID_SDK_ROOT ${ANDROID_SDK_ROOT}
RUN apt-get update && apt-get install -y \
    libpulse0 \
    libglu1 \
    libncurses5 \
    qemu-kvm \
    kmod \
    && rm -rf /var/lib/apt/lists/*

# Copy Android SDK from previous stage
COPY --from=android-build /usr/local/android-sdk /usr/local/android-sdk
# RUN   yes | apt-get update && yes |  apt-get install android-tools-adb android-tools-fastboot && yes | apt-get install sdkmanager
# RUN yes | sdkmanager --licenses
# # Create AVD (Android Virtual Device)
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin:${ANDROID_SDK_ROOT}/platform-tools

RUN echo "no" | ${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin/avdmanager --verbose create avd --force --name test --device "pixel" --package "system-images;android-30;google_apis;x86_64"


# Expose necessary ports
EXPOSE 5554 5555 5901 6080

# Start Android emulator
CMD ["${ANDROID_SDK_ROOT}/emulator/emulator", "-avd", "test"]
